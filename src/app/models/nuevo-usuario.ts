export class NuevoUsuario {

    nombreUsuario: string;
    email: string;
    rol: number;
    roles: string[];
    password: string;

    constructor(nombreUsuario: string, email: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        rol: 5;
        this.roles = ['USUARIO_FINAL'];
    }
  
}
