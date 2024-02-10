const path = require('path'); // подключаем path к конфигу вебпак (утилита, которая превращает относительный путь в абсолютный)
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = { // module.exports — это синтаксис экспорта в Node.js
  entry: { main: './src/index.js' },  // указали первое место, куда заглянет webpack, — файл index.js в папке src  
  output: {  // указали, в какой файл будет собираться весь js, и дали ему имя dist
    path: path.resolve(__dirname, 'dist'),  // путь к точке выхода
    filename: 'main.js',   //имя файла, куда Webpack положит код
        publicPath: ''  // свойство для обновления путей внутри CSS- и HTML-файлов
  },
  mode: 'development', // добавили режим разработчика
  devServer: { //добавим настройки локального сервера
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  }, 
  module: { //создали свойство module
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      //«если тебе попадётся файл с расширением .js, сначала отдай этот файл модулю babel-loader, 
      //а затем добавляй в сборку. Но не применяй это правило к пакетам, скачанным из NPM, 
      //которые лежат в папке node_modules»
      {        
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader        
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
       // добавили правило для обработки файлов
  {
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
    type: 'asset/resource' //значение asset/resource позволяет переносить исходные файлы в конечную сборку в том же формате
  },
  {
    // применять это правило только к CSS-файлам
    test: /\.css$/,
    // при обработке этих файлов нужно использовать
    // MiniCssExtractPlugin.loader и css-loader
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      options: { importLoaders: 1 } //Эта опция описана в документации сss-loader. Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
    }, 
    'postcss-loader']
  },
      ]
  },
  plugins: [ // добавили новое свойство — массив plugins:
    new HtmlWebpackPlugin({ //При подключении плагина мы передаём ему объект опций. В нашем случае опция одна — template. 
      template: './src/index.html' // Это относительный путь к файлу index.html 
    }),
    new CleanWebpackPlugin(), // использовали плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist. (Настраивать его не потребуется, достаточно вызвать CleanWebpackPlugin)
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ] 
};

// переписали точку выхода, используя утилиту path

