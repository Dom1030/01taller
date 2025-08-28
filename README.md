# Sistema de Gestión de Biblioteca Avanzado

## 📚 Descripción
Sistema completo de gestión de biblioteca desarrollado en JavaScript/Node.js que permite administrar préstamos, devoluciones, búsquedas avanzadas, reportes estadísticos y manejo de multas por retraso.

## 🚀 Características Principales

### Gestión de Libros
- ✅ Creación y validación de libros con campos obligatorios
- ✅ Adición y eliminación segura de libros
- ✅ Actualización de información de libros (excepto cuando están prestados)
- ✅ Búsqueda avanzada por título, autor, género e ISBN
- ✅ Filtrado por género y disponibilidad

### Sistema de Préstamos
- ✅ Préstamo de libros con validación de disponibilidad
- ✅ Control de fechas de vencimiento automático
- ✅ Devolución de libros con cálculo de multas
- ✅ Manejo de libros vencidos y cálculo de días de retraso
- ✅ Validación de nombre del prestatario

### Reportes y Estadísticas
- ✅ Reporte general de la biblioteca
- ✅ Estadísticas de distribución por géneros
- ✅ Identificación del género más popular
- ✅ Detalles de libros vencidos y multas acumuladas
- ✅ Contadores de libros disponibles, prestados y totales

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Dom1030/01taller.git

# Navegar al directorio
cd Library.System

# Instalar dependencias (si las hubiera)
npm install
```

## 🎯 Uso Básico

```javascript
const Library = require('./library.js');

// Crear instancia de la biblioteca
const biblioteca = new Library();

// Agregar libros
biblioteca.addBookToLibrary("El Principito", "Antoine de Saint-Exupéry", "Ficción", "123456789");

// Prestar libro
biblioteca.borrowBook(libroId, "María García", 14); // 14 días de préstamo

// Devolver libro
biblioteca.returnBook(libroId);

// Generar reporte
const reporte = biblioteca.generateLibraryReport();
```

## 📋 Comandos Disponibles

```bash
# Ejecutar la aplicación principal
npm start

# Ejecutar pruebas completas
npm test

# Modo desarrollo
npm run dev

# Verificar estilo de código (si se configura ESLint)
npm run lint
```

## 🔧 API de la Clase Library

### Métodos Principales

#### Gestión de Libros
- `addBookToLibrary(title, author, genre, isbn)` - Agrega un nuevo libro
- `removeBookFromLibrary(id)` - Elimina un libro por ID
- `updateBook(id, updates)` - Actualiza información del libro
- `searchBooks(criteria)` - Búsqueda por múltiples criterios
- `getBooksByGenre(genre)` - Filtra libros por género
- `getAvailableBooks()` - Lista libros disponibles
- `getBorrowedBooks()` - Lista libros prestados

#### Sistema de Préstamos
- `borrowBook(bookId, borrowerName, days)` - Presta un libro
- `returnBook(bookId)` - Devuelve un libro prestado
- `calculateFine(dueDate, fineRate)` - Calcula multas por retraso
- `getOverdueBooks(fineRate)` - Obtiene libros vencidos

#### Reportes y Estadísticas
- `generateLibraryReport()` - Reporte general de la biblioteca
- `getLibraryStats()` - Estadísticas avanzadas con distribución por géneros

## 🎨 Ejemplos de Uso

### Ejemplo 1: Flujo Completo
```javascript
const biblioteca = new Library();

// Agregar libros
const { book: libro1 } = biblioteca.addBookToLibrary("1984", "George Orwell", "Ficción", "9780451524935");
const { book: libro2 } = biblioteca.addBookToLibrary("Cien años de soledad", "García Márquez", "Realismo mágico", "9788437604947");

// Prestar libro
const prestamo = biblioteca.borrowBook(libro1.id, "Juan Pérez", 7);

// Devolver libro (con posible multa)
const devolucion = biblioteca.returnBook(libro1.id);

// Generar reporte completo
const estadisticas = biblioteca.getLibraryStats();
```

### Ejemplo 2: Búsquedas Avanzadas
```javascript
// Buscar por cualquier criterio
const resultados = biblioteca.searchBooks("orwell");

// Filtrar por género
const ficcion = biblioteca.getBooksByGenre("Ficción");

// Ver libros disponibles
const disponibles = biblioteca.getAvailableBooks();
```

## ⚙️ Configuración

### Variables de Multas
- **Tasa de multa predeterminada**: $0.50 por día de retraso
- **Días de préstamo predeterminados**: 14 días

### Validaciones Implementadas
- ✅ Campos obligatorios al crear libros
- ✅ Validación de libros ya prestados
- ✅ Verificación de existencia de libros
- ✅ Validación de nombre del prestatario
- ✅ Prevención de modificación de libros prestados

## 🐛 Manejo de Errores

El sistema incluye manejo robusto de errores con mensajes descriptivos:
- Libros no encontrados
- Libros no disponibles
- Campos obligatorios faltantes
- Intentos de modificación inválidos

## 📊 Estructura de Datos

Cada libro contiene:
```javascript
{
  id: Number,           // ID único generado automáticamente
  title: String,         // Título del libro
  author: String,        // Autor del libro
  genre: String,         // Género literario
  isbn: String,          // ISBN único
  isAvailable: Boolean,  // Estado de disponibilidad
  borrowedBy: String,    // Nombre del prestatario (si está prestado)
  borrowedAt: Date,      // Fecha de préstamo
  dueDate: Date,         // Fecha de vencimiento
  createdAt: Date        // Fecha de creación
}
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Distribuido bajo la licencia ISC. Ver `LICENSE` para más información.

## 🐛 Reportar Problemas

Si encuentras algún problema, por favor abre un issue en [GitHub Issues](https://github.com/Dom1030/01taller/issues).

## ✨ Mejoras Futuras

- [ ] Interfaz gráfica de usuario
- [ ] Persistencia de datos (base de datos)
- [ ] Sistema de autenticación de usuarios
- [ ] Historial completo de préstamos
- [ ] Exportación de reportes a PDF/Excel
- [ ] API RESTful
- [ ] Integración con sistemas de código de barras
