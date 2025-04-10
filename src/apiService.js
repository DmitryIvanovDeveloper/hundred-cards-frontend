export async function signUp(userData) {
  const response = await fetch(`/sign_up/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(responseData));
  }
  return responseData;
}

// Add the signIn function below
export async function signIn(credentials) {
  const response = await fetch(`/sign_in/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(responseData));
  }
  return responseData;
}

export async function makeAdmin(token) {
  const response = await fetch(`/make_admin/`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Failed to set administrator privileges");
  }
  return response.json();
}

export async function createProject(token, projectName) {
  const response = await fetch(`/cards/admin/projects/`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: projectName })
  });
  if (!response.ok) {
    throw new Error("Failed to create project");
  }
  return response.json();
}

export async function createLevel(token, langIso, levelLabel, projectId) {
  const response = await fetch(`/cards/admin/levels/`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lang_iso: langIso,
      level: levelLabel,
      project_id: projectId
    })
  });
  if (!response.ok) {
    throw new Error("Failed to create level");
  }
  return response.json();
}
