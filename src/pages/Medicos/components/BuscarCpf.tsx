import InputMask from "react-input-mask";

interface BuscarCpfProps {
  buscaCpf: string;
  setBuscaCpf: (value: string) => void;
  handleCpfSearch: () => void;
}

const BuscarCpf: React.FC<BuscarCpfProps> = ({
  buscaCpf,
  setBuscaCpf,
  handleCpfSearch,
}) => (
  <div className="mb-6 max-w-[500px]">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Buscar por CPF
    </label>
    <div className="flex gap-4">
      <InputMask
        mask="999.999.999-99"
        value={buscaCpf}
        onChange={(e) => setBuscaCpf(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md"
        placeholder="CPF do Usuário"
      />
      <button
        type="button"
        onClick={handleCpfSearch}
        className="p-2 bg-[#084E6F] text-white rounded-md hover:bg-[#54719C] w-[50px]"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  </div>
);

export default BuscarCpf;
