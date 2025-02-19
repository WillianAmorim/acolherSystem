import { ChangeEvent } from "react";

type Option = {
    value: string;
    label: string;
};

type Props = {
    value: string;
    name: string; // Adicione o tipo name aqui
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    valueLabel?: string;
    labelWidthValue?: string;
    disabled?: boolean
    campoRequired?: boolean
};

const Select = (props: Props) => {
    return (
        <label htmlFor={props.name} className={`flex flex-col text-sm ${props.labelWidthValue}`}>
            {props.valueLabel}
            <select
                value={props.value}
                name={props.name} // Adicione o atributo name no select
                onChange={props.onChange}
                className="bg-white border border-gray-300 p-[7px] rounded-md w-full h-10"
                disabled={props.disabled} // Aqui desabilitamos o <select>
                required={props.campoRequired}
            >
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default Select;
