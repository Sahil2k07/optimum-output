export class AuthService {
  async signIn(userType: string) {
    const token =
      userType === "wholeseller"
        ? "wholeseller-user-token"
        : "customer-user-token";

    return { token };
  }
}

export default new AuthService();
