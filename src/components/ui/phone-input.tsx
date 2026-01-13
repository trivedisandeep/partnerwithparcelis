import { PhoneInput as ReactPhoneInput, CountryIso2 } from 'react-international-phone';
import 'react-international-phone/style.css';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  defaultCountry?: CountryIso2;
  className?: string;
  hasError?: boolean;
  placeholder?: string;
}

export const PhoneInput = ({
  value,
  onChange,
  defaultCountry = 'us',
  className,
  hasError = false,
  placeholder,
}: PhoneInputProps) => {
  return (
    <ReactPhoneInput
      defaultCountry={defaultCountry}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        'phone-input-container',
        hasError && 'phone-input-error',
        className
      )}
      inputClassName="phone-input-field"
      countrySelectorStyleProps={{
        buttonClassName: 'phone-input-country-button',
        dropdownStyleProps: {
          className: 'phone-input-dropdown',
          listItemClassName: 'phone-input-dropdown-item',
        },
      }}
    />
  );
};

export default PhoneInput;
