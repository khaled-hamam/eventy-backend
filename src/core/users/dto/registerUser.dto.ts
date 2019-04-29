export interface RegisterUserDTO {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly mobile: string;
    readonly role: "planner" | "creator";
}