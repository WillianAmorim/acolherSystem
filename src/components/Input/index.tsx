import { ChangeEvent } from "react";

type Props = {
    type: string;
    value: any;
    name: string; // Adicione o atributo name no tipo Props
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    valueLabel?: string;
    className?: string; // Adicione a propriedade className como opcional
    labelWidthValue: any;
    disabled?: boolean;
    campoRequired?: boolean;
};

const Input = (props: Props) => {
    return (
        <label htmlFor={props.name} className={`flex flex-col w-1/4 text-sm ${props.labelWidthValue}`}>
            {props.valueLabel}
            <input
                type={props.type}
                value={props.value}
                name={props.name} // Adicione o atributo name aqui
                onChange={props.onChange}
                placeholder={props.placeholder}
                className={`p-2 rounded-md border-[1px] border-[#D1D5DB] h-10`}
                required={props.campoRequired}
                disabled={props.disabled}
            />
        </label>
    );
};

export default Input;
