interface CardProps {
    title: string;
    value: string | number;
    icon: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
            <h3 className="font-medium text-[#575757] text-2xl pt-4">{title}</h3>
            <p className="text-lg text-[#575757] font-bold mt-2">{value}</p>
        </div>
        <i className={icon}></i>
    </div>
);

export default Card;
