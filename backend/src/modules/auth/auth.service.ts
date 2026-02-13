export class AuthService {
  async signIn(userType: string) {
    let token = "customer-user-token";

    if (userType === "admin") {
      token = "admin-user-token";
    } else if (userType === "wholeseller") {
      token = "wholeseller-user-token";
    }

    return { token };
  }
}

export default new AuthService();
