export declare enum Permissions {
    Send = "send",
    Mine = "mine",
    Issue = "issue",
    Admin = "admin",
    Create = "create",
    Connect = "connect",
    Receive = "receive",
    Activate = "activate"
}
export declare class GrantBody {
    readonly address: string;
    readonly permissions: string;
}
