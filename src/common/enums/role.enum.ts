export const Role: {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY'
} = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY'
}
export type Role = typeof Role[keyof typeof Role]