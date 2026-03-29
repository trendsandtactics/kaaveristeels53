export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL?.trim() || "admin@kaaveristeels.com";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "Admin@Kaaveri";
}

export function isValidAdminLogin(email: string, password: string): boolean {
  return email === getAdminEmail() && password === getAdminPassword();
}
