const Header = ({
  logoSrc,
  selectedOption,
  setSelectedOption,
  setSelectedButton,
}) => {
  return (
    <header className="flex flex-col items-center p-6 bg-gray-900 text-white shadow-lg border-b-2 border-gray-700 space-y-6 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 sm:px-8">
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
      >
        <img src={logoSrc} alt="Logo" className="h-14 sm:h-12" />
      </a>

      {/* Selector estilizado */}
      <select
        className="bg-gray-800 text-white p-3 rounded-lg border border-gray-600 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-full max-w-xs sm:max-w-none sm:w-64"
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          setSelectedButton(null);
        }}
      >
        <option value="">Seleccionar una opción</option>
        <option value="Arándano">Arándano</option>
        <option value="Uva">Uva</option>
      </select>
    </header>
  );
};

export default Header;
