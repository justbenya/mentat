export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-4 space-y-4">
        {/* Панель поиска и фильтров */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <input
            type="text"
            placeholder="Поиск карты..."
            className="w-full sm:w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-md shadow-sm focus:outline-none">
              <option>Категория</option>
              <option>Агент</option>
              <option>Империя</option>
              <option>Союз</option>
            </select>
            <select className="px-3 py-2 border rounded-md shadow-sm focus:outline-none">
              <option>Фракция</option>
              <option>Атрейдес</option>
              <option>Харконнен</option>
              <option>Фримены</option>
            </select>
          </div>
        </div>

        {/* Кнопка добавления карты */}
        <div>
          <button className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
            Добавить карту игроку
          </button>
        </div>

        {/* Колонки игроков */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-100 border rounded-lg p-3">
            <h3 className="text-green-900 font-semibold mb-2">Игрок 1</h3>
            <ul className="space-y-1">
              <li>✔️ Леди Джессика</li>
              <li>✔️ Прецизион</li>
            </ul>
          </div>

          <div className="bg-blue-100 border rounded-lg p-3">
            <h3 className="text-blue-900 font-semibold mb-2">Игрок 2</h3>
            <ul className="space-y-1">
              <li>✔️ Прецизион</li>
            </ul>
          </div>

          <div className="bg-red-100 border rounded-lg p-3">
            <h3 className="text-red-900 font-semibold mb-2">Игрок 3</h3>
            <ul className="space-y-1">
              <li>✔️ Леди Джессика</li>
              <li>✔️ Прецизион</li>
            </ul>
          </div>

          <div className="bg-yellow-100 border rounded-lg p-3">
            <h3 className="text-yellow-900 font-semibold mb-2">Игрок 4</h3>
            <ul className="space-y-1">
              <li>✔️ Дункан Айдахо</li>
              <li>✔️ Хоут</li>
            </ul>
          </div>
        </div>

        {/* Кнопка сохранить */}
        <div>
          <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
            Сохранить прогресс
          </button>
        </div>
      </div>
    </div>
  );
}
