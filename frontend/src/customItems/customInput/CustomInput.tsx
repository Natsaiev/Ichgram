import React, {CSSProperties} from "react";

interface InputProps {
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    style?: CSSProperties;
    errorMessage?: string;
    value?: string;
    schowError?: boolean;
    icon?: React.ReactNode;
    onChange?: (value: string) => void;
}

const CustomInput: React.FC<InputProps> = ({
    placeholder = '',
    value = '',
    onChange,
    icon,
    errorMessage,
    type = 'text',
    className = '',
    style = {},
    }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange) {
            onChange(event.target.value);
        }; // Если onChange присутствует, вызываем его с новым значением

        const inputClass = `${style.inputContainer} ${errorMessage ? style.error : ''} ${className}`;
        return (
            <div className={inputClass}>
                <input
                    className={style.input}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                />
                {icon && <div className={style.icon}>{icon}</div>}
            </div>
        );
    }
}