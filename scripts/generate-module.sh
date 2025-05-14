#!/bin/bash

MODULE_NAME=$1

if [ -z "$MODULE_NAME" ]; then
  echo "❌ Укажи имя модуля: npm run generate-module my-module"
  exit 1
fi

PASCAL_NAME=$(echo "$MODULE_NAME" | sed -r 's/(^|-)(\w)/\U\2/g' | sed 's/^-//')

UPPER_NAME=$(echo "$MODULE_NAME" | tr '[:lower:]' '[:upper:]')
BASE=src/modules/admin/$MODULE_NAME

# Создание структуры
mkdir -p $BASE/{business/{dtos,entities,errors,events,plugins,services,usecases},infrastructure/{bootstrap,repositories},presentation/{controller,presenter,view/view-models,view/mappers}}

# DTO и интерфейсы
cat <<EOF > $BASE/business/dtos/load-${MODULE_NAME}.dto.ts
import Get${PASCAL_NAME}Response from "../../infrastructure/repositories/dtos/get-${MODULE_NAME}.dto.ts";
export class Load${PASCAL_NAME}RequestDTO {
    constructor(response: Get${PASCAL_NAME}Response) {
    
    }
}
EOF

cat <<EOF > $BASE/business/dtos/update-${MODULE_NAME}.dto.ts
import Get${PASCAL_NAME}Response from "../../infrastructure/repositories/dtos/update-${MODULE_NAME}.dto.ts";
export class Update${PASCAL_NAME}RequestDTO {
    constructor(response: Update${PASCAL_NAME}Response) {
    
    }
}
EOF

cat <<EOF > $BASE/business/dtos/delete-${MODULE_NAME}.dto.ts
import Delete${PASCAL_NAME}Response from "../../infrastructure/repositories/dtos/delete-${MODULE_NAME}.dto.ts";
export class Delete${PASCAL_NAME}RequestDTO {
    constructor(response: Delete${PASCAL_NAME}Response) {
    
    }
}
EOF

cat <<EOF > $BASE/business/plugins/${MODULE_NAME}.repository.plugin.ts
import Result from "@/infrastructure/helpers/result";
import ${PASCAL_NAME}DTO from "../dtos/${MODULE_NAME}.dto";

export default interface I${PASCAL_NAME}Repository {
}
EOF

cat <<EOF > $BASE/business/plugins/${MODULE_NAME}.local-repository.plugin.ts
import { Ref } from "vue";
import { ${PASCAL_NAME} } from "../entities/${MODULE_NAME}";

export default interface I${PASCAL_NAME}LocalRepository {
  store(items: ${PASCAL_NAME}[]): void;
  get(): Ref<${PASCAL_NAME}[]>;
}
EOF

# Entity
cat <<EOF > $BASE/business/entities/${MODULE_NAME}.ts
export class ${PASCAL_NAME} {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
}
EOF


# Repository DTO
cat <<EOF > $BASE/infrastructure/repositories/dtos/get-${MODULE_NAME}.dto.ts
export default interface IGet${PASCAL_NAME}Response {
}
EOF

cat <<EOF > $BASE/infrastructure/repositories/dtos/get-${MODULE_NAME}.dto.ts
export default class Post${PASCAL_NAME}Request {
  	constructor(request: Update${PASCAL_NAME}RequestDTO) {
	}
}

export default interface IPost${PASCAL_NAME}Response {
  		constructor(request: Update${PASCAL_NAME}ResponseDTO) {
	}
}
EOF


# HttpRepository
cat <<EOF > $BASE/infrastructure/repositories/${PASCAL_NAME}.http.repository.ts
import I${PASCAL_NAME}Repository from "@/modules/admin/${MODULE_NAME}/business/plugins/${MODULE_NAME}.repository.plugin";
import ${PASCAL_NAME}DTO from "@/modules/admin/${MODULE_NAME}/business/dtos/${MODULE_NAME}.dto";
import Result from "@/infrastructure/helpers/result";
import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";

export default class ${PASCAL_NAME}HttpRepository implements I${PASCAL_NAME}Repository {

 constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient 
  ){}


  async load${PASCAL_NAME}(): Promise<Result<${PASCAL_NAME}DTO[]>> {
    const data = await Promise.resolve([{ id: "1", name: "Example" }]);
    return Result.success(data);
  }
}
EOF

# LocalRepository
cat <<EOF > $BASE/infrastructure/repositories/${PASCAL_NAME}.local.repository.ts
import { ref, Ref } from "vue";
import { ${PASCAL_NAME} } from "@/modules/admin/${MODULE_NAME}/business/entities/${MODULE_NAME}";
import I${PASCAL_NAME}LocalRepository from "@/modules/admin/${MODULE_NAME}/business/plugins/${MODULE_NAME}.local.repository.plugin";

export default class ${PASCAL_NAME}LocalRepository implements I${PASCAL_NAME}LocalRepository {
  private _items = ref<${PASCAL_NAME}[]>([]);

  store(items: ${PASCAL_NAME}[]): void {
    this._items.value = items;
  }

  get(): Ref<${PASCAL_NAME}[]> {
    return this._items;
  }
}
EOF

# Presenter
cat <<EOF > $BASE/presentation/presenter/${MODULE_NAME}.presenter.ts
import I${PASCAL_NAME}LocalRepository from "@/modules/admin/${MODULE_NAME}/business/plugins/${MODULE_NAME}.local-repository.plugin";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";

@injectable()
export default class ${PASCAL_NAME}Presenter {
  constructor(
    @inject(TYPES.${PASCAL_NAME}LocalRepository)
    private readonly store: I${PASCAL_NAME}LocalRepository
  ) {}

  get items() {
    return this.store.get();
  }
}
EOF

# Controller
cat <<EOF > $BASE/presentation/controller/${MODULE_NAME}.controller.ts
import { inject, injectable } from "inversify";
import { TYPES, NAMES } from "../../types";
import I${PASCAL_NAME}Repository from "@/modules/admin/${MODULE_NAME}/business/plugins/${MODULE_NAME}.repository.plugin";
import I${PASCAL_NAME}LocalRepository from "@/modules/admin/${MODULE_NAME}/business/plugins/${MODULE_NAME}.local-repository.plugin";
import { ${PASCAL_NAME} } from "@/modules/admin/${MODULE_NAME}/business/entities/${MODULE_NAME}";

@injectable()
export default class ${PASCAL_NAME}Controller {
  constructor(
    @inject(TYPES.${PASCAL_NAME}Repository)
    @named(NAMES.HttpRepository)
    private readonly repository: I${PASCAL_NAME}Repository,

    @inject(TYPES.${PASCAL_NAME}LocalRepository)
    private readonly store: I${PASCAL_NAME}LocalRepository
  ) {}

  async load() {
    const result = await this.repository.load${PASCAL_NAME}s();
    if (result.hasData()) {
      const entities = result.data.map(dto => new ${PASCAL_NAME}(dto.id, dto.name));
      this.store.store(entities);
    }
  }
}
EOF

# ViewModel
cat <<EOF > $BASE/presentation/view/view-models/${MODULE_NAME}.view-model.ts
import { ${PASCAL_NAME} } from "@/modules/admin/${MODULE_NAME}/business/entities/${MODULE_NAME}";

export default class ${PASCAL_NAME}ViewModel {
  constructor(private entity: ${PASCAL_NAME}) {}

  get id() {
    return this.entity.id;
  }

  get name() {
    return this.entity.name;
  }
}
EOF

# TYPES
cat <<EOF > $BASE/types.ts
const TYPES = {
  ${PASCAL_NAME}Repository: Symbol.for("${PASCAL_NAME}Repository"),
  ${PASCAL_NAME}LocalRepository: Symbol.for("${PASCAL_NAME}LocalRepository"),
  ${PASCAL_NAME}Presenter: Symbol.for("${PASCAL_NAME}Presenter"),
  ${PASCAL_NAME}Controller: Symbol.for("${PASCAL_NAME}Controller"),
};

const NAMES = {
  HttpRepository: "HttpRepository",
  LocalRepository: "LocalRepository",
};

export { TYPES, NAMES };
EOF

# container.ts
cat <<EOF > $BASE/infrastructure/bootstrap/container.ts
import { TYPES, NAMES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';

import I${PASCAL_NAME}Repository from '@/modules/admin/${MODULE_NAME}/business/plugins/${MODULE_NAME}.repository.plugin';
import I${PASCAL_NAME}LocalRepository from '@/modules/admin/${MODULE_NAME}/business/plugins/${MODULE_NAME}.local-repository.plugin';
import ${PASCAL_NAME}HttpRepository from '@/modules/admin/${MODULE_NAME}/infrastructure/repositories/${PASCAL_NAME}HttpRepository';
import ${PASCAL_NAME}LocalRepository from '@/modules/admin/${MODULE_NAME}/infrastructure/repositories/${PASCAL_NAME}LocalRepository';
import ${PASCAL_NAME}Presenter from '@/modules/admin/${MODULE_NAME}/presentation/presenter/${MODULE_NAME}.presenter';
import ${PASCAL_NAME}Controller from '@/modules/admin/${MODULE_NAME}/presentation/controller/${MODULE_NAME}.controller';

container
  .bind<I${PASCAL_NAME}Repository>(TYPES.${PASCAL_NAME}Repository)
  .to(${PASCAL_NAME}HttpRepository)
  .whenTargetNamed(NAMES.HttpRepository);

container
  .bind<I${PASCAL_NAME}LocalRepository>(TYPES.${PASCAL_NAME}LocalRepository)
  .to(${PASCAL_NAME}LocalRepository)
  .inSingletonScope();

container
  .bind(TYPES.${PASCAL_NAME}Presenter)
  .to(${PASCAL_NAME}Presenter)
  .inSingletonScope();

container
  .bind(TYPES.${PASCAL_NAME}Controller)
  .to(${PASCAL_NAME}Controller)
  .inSingletonScope();
EOF

echo "✅ Модуль $MODULE_NAME с полной архитектурной структурой успешно создан!"
