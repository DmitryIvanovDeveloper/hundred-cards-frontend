import { NetworkError } from '@/infrastructure//errors/network.error';
import IHttpClient from '@/infrastructure//api/http/http.interface';
import { injectable } from 'inversify';
import Result from '@/infrastructure/helpers/result';
import IErrorResponse from '../../dtos/errorResponse';
import { IError } from '../../dtos/error-type';

const mockFiles = import.meta.glob<{ default: unknown }>('@/infrastructure//mocks/**/*.json', { eager: true });

@injectable()
export default class HttpClientMock implements IHttpClient {
    private mockResponses: Map<string, unknown> = new Map();
    public error: IError | undefined = undefined;

    public lastEndpointNumber = 1;

    private async loadMockResponse(endpoint: string): Promise<void> {
        const formattedEndpoint = this.getLastEndpointParts(endpoint, this.lastEndpointNumber);
        const fileName = !this.error ? `${formattedEndpoint}.json` : `${formattedEndpoint}.${this.error.code}${!this.error.type ? '' : `.${this.error.type}`}.json`;

        const mockEntry = Object.entries(mockFiles).find(([key]) => key.endsWith(`/${fileName}`));

        if (!mockEntry) {
            console.warn(`[MOCK] JSON для ${endpoint} по пути ${fileName} не найден`);
            return;
        }

        const [, module] = mockEntry;
        this.mockResponses.set(endpoint, module.default);
    }

    public async request<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        payload?: TRequest,
    ): Promise<Result<TResponse>> {
        await this.loadMockResponse(endpoint);

        if (!this.mockResponses.has(endpoint)) {
            throw new Error(`[MOCK] No mock response found for ${endpoint}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!!this.error) {
            const response = this.mockResponses.get(endpoint) as IErrorResponse;
            return Result.failure(new NetworkError('', '', response));
        }

        const response = this.mockResponses.get(endpoint) as TResponse;
        return Result.success(response);
    }

    public get<TResponse>(endpoint: string): Promise<Result<TResponse>> {
        return this.request<TResponse, undefined>(`${endpoint}.get`, 'GET');
    }

    public post<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest,
    ): Promise<Result<TResponse>> {
        return this.request<TResponse, TRequest>(`${endpoint}.post`, 'POST', payload);
    }

    public put<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest,
    ): Promise<Result<TResponse>> {
        return this.request<TResponse, TRequest>(endpoint, 'PUT', payload);
    }

    public delete<TResponse>(endpoint: string): Promise<Result<TResponse>> {
        return this.request<TResponse, undefined>(endpoint, 'DELETE');
    }

    private getLastEndpointParts(endpoint: string, partsCount: number): string {
        const [path, query] = endpoint.split('?');

        const methodMatch = query?.match(/\.(get|post|put|delete)$/i);
        const methodSuffix = methodMatch ? methodMatch[0] : '';

        return path + methodSuffix;
    }
}
