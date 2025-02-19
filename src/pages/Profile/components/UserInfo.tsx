import React from "react";
import { Usuario } from "../hooks/useFetchUser";

interface UserInfoProps {
    usuario: Usuario;
}

const UserInfo: React.FC<UserInfoProps> = ({ usuario }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries({
                "Nome Completo": usuario?.nome_completo || "Não informado",
                Email: usuario?.email || "Não informado",
                "Data de Nascimento": usuario?.data_nascimento 
                    ? new Date(usuario.data_nascimento).toLocaleDateString("pt-BR") 
                    : "Não informado",
                Sexo: usuario?.sexo || "Não informado",
                CPF: usuario?.cpf 
                    ? usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") 
                    : "Não informado",
                RG: usuario?.rg || "Não informado",
                Telefone: usuario?.telefone || "Não informado",
                Celular: usuario?.celular || "Não informado",
                Unidade: usuario?.unidade || "Não informado",
                Role: usuario?.role || "Não informado",
            }).map(([label, value]) => (
                <div key={label}>
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <p className="p-2 border border-gray-300 rounded-md bg-gray-100">{value}</p>
                </div>
            ))}
        </div>
    );
};

export default UserInfo;
