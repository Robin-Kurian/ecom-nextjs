export type Role = "admin" | "customer";

export function canAccess(role: Role, required: Role | Role[]): boolean {
  if (Array.isArray(required)) return required.includes(role);
  return role === required;
} 