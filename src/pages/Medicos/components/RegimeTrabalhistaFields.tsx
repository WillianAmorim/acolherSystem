import InputMask from "react-input-mask";

interface RegimeTrabalhistaFieldsProps {
  regimeTrabalhista: string;
  setRegimeTrabalhista: (value: string) => void;
  cargaHoraria: string;
  setCargaHoraria: (value: string) => void;
  cnpj: string;
  setCnpj: (value: string) => void;
}

const RegimeTrabalhistaFields: React.FC<RegimeTrabalhistaFieldsProps> = ({
  regimeTrabalhista,
  setRegimeTrabalhista,
  cargaHoraria,
  setCargaHoraria,
  cnpj,
  setCnpj,
}) => (
  <div className="grid grid-cols-3 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Regime Trabalhista
      </label>
      <select
        value={regimeTrabalhista}
        onChange={(e) => setRegimeTrabalhista(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      >
        <option value="">Escolha uma opção</option>
        <option value="0">CLT</option>
        <option value="1">PJ</option>
        <option value="2">Autônomo</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Carga Horária
      </label>
      <input
        type="number"
        value={cargaHoraria}
        onChange={(e) => setCargaHoraria(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full"
        placeholder="Carga Horária"
        required
      />
    </div>
    {regimeTrabalhista === "1" && (
      <div>
        <label className="block text-sm font-medium text-gray-700">CNPJ</label>
        <InputMask
          mask="99.999.999/9999-99"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="CNPJ"
          className="p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
    )}
  </div>
);

export default RegimeTrabalhistaFields;
