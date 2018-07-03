Config 

Общие ззначения для всех окружений
./backend/config/common
Его значения расширяются параметрами из коифигов окружений по средвам рекурсивного слияния
// https://lodash.com/docs/4.17.10#merge 


Конфинг для разрабокти process.env.NODE_ENV === development
./backend/config/development


Конфинг для тестирования process.env.NODE_ENV === test
./backend/config/test 


Продакшин конфиг process.env.NODE_ENV === production
./backend/config/production
