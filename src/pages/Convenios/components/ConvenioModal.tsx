import { useState, FC } from 'react';
import InputMask from 'react-input-mask';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface ConvenioFormData {
  empresa: string;
  cnpj: string;
  valor_convenio: string;
}

interface ConvenioModalProps {
  onClose: () => void;
  onSave: (data: ConvenioFormData) => void;
}

const ConvenioModal: FC<ConvenioModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<ConvenioFormData>({
    empresa: '',
    cnpj: '',
    valor_convenio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, cnpj: e.target.value });
  };

  const handleValorChange: NumericFormatProps['onValueChange'] = (values) => {
    const { value } = values;
    setFormData({ ...formData, valor_convenio: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedData = {
      ...formData,
      cnpj: formData.cnpj.replace(/\D/g, ''),
    };
    onSave(sanitizedData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Cadastrar Convênio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Empresa</label>
            <input
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CNPJ</label>
            <InputMask
              mask="99.999.999/9999-99"
              value={formData.cnpj}
              onChange={handleCnpjChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Valor Convênio</label>
            <NumericFormat
              value={formData.valor_convenio}
              onValueChange={handleValorChange}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#084D71] text-white py-2 px-4 rounded hover:bg-[#54719C]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConvenioModal;
