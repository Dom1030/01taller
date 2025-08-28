const Library = require('./library.js');
const library = new Library(); // Crea una nueva instancia de la biblioteca

console.log("=== SISTEMA DE GESTIÓN DE BIBLIOTECA - PRUEBAS COMPLETAS ===\n");

// 1. Pruebas de creación de libros
console.log("1. PRUEBAS DE CREACIÓN DE LIBROS:");
console.log("-".repeat(50));

// Libro válido
const libro1 = library.addBookToLibrary("El Principito", "Antoine de Saint-Exupéry", "Ficción", "123456789");
console.log("✓ Libro 1 creado:", libro1.message);

// Libro válido
const libro2 = library.addBookToLibrary("1984", "George Orwell", "Ficción", "987654321");
console.log("✓ Libro 2 creado:", libro2.message);

// Libro válido
const libro3 = library.addBookToLibrary("Cien años de soledad", "Gabriel García Márquez", "Realismo mágico", "456789123");
console.log("✓ Libro 3 creado:", libro3.message);

// Libro con datos faltantes (debe fallar)
const libroInvalido = library.addBookToLibrary("", "Autor", "Género", "111111");
console.log("✗ Libro inválido:", libroInvalido.message);

console.log("\n2. PRUEBAS DE BÚSQUEDA Y LISTADO:");
console.log("-".repeat(50));

// Buscar todos los libros
const todosLosLibros = library.searchBooks("");
console.log("✓ Total de libros:", todosLosLibros.length);

// Buscar por título
const busquedaTitulo = library.searchBooks("principito");
console.log("✓ Búsqueda por título:", busquedaTitulo.length, "resultados");

// Buscar por autor
const busquedaAutor = library.searchBooks("orwell");
console.log("✓ Búsqueda por autor:", busquedaAutor.length, "resultados");

// Buscar por género
const busquedaGenero = library.searchBooks("ficción");
console.log("✓ Búsqueda por género:", busquedaGenero.length, "resultados");

// Listar libros disponibles
const disponibles = library.getAvailableBooks();
console.log("✓ Libros disponibles:", disponibles.length);

console.log("\n3. PRUEBAS DE PRÉSTAMO DE LIBROS:");
console.log("-".repeat(50));

// Prestar libro exitosamente
const prestamo1 = library.borrowBook(library.books[0].id, "María García");
console.log("✓ Préstamo 1:", prestamo1.message);

// Intentar prestar el mismo libro (debe fallar)
const prestamo2 = library.borrowBook(library.books[0].id, "Carlos López");
console.log("✗ Préstamo mismo libro:", prestamo2.message);

// Prestar otro libro
const prestamo3 = library.borrowBook(library.books[1].id, "Ana Martínez");
console.log("✓ Préstamo 2:", prestamo3.message);

// Intentar prestar libro inexistente (debe fallar)
const prestamoInexistente = library.borrowBook(999999, "Juan Pérez");
console.log("✗ Préstamo libro inexistente:", prestamoInexistente.message);

// Intentar prestar sin nombre (debe fallar)
const prestamoSinNombre = library.borrowBook(library.books[2].id, "");
console.log("✗ Préstamo sin nombre:", prestamoSinNombre.message);

console.log("\n4. PRUEBAS DE DEVOLUCIÓN DE LIBROS:");
console.log("-".repeat(50));

// Devolver libro exitosamente
const devolucion1 = library.returnBook(library.books[0].id);
console.log("✓ Devolución 1:", devolucion1.message, "- Multa:", devolucion1.fine);

// Intentar devolver libro no prestado (debe fallar)
const devolucion2 = library.returnBook(library.books[0].id);
console.log("✗ Devolución libro no prestado:", devolucion2.message);

// Intentar devolver libro inexistente (debe fallar)
const devolucionInexistente = library.returnBook(999999);
console.log("✗ Devolución libro inexistente:", devolucionInexistente.message);

console.log("\n5. PRUEBAS DE ACTUALIZACIÓN DE LIBROS:");
console.log("-".repeat(50));

// Actualizar libro exitosamente
const actualizacion = library.updateBook(library.books[2].id, {
    title: "Cien años de soledad (Edición Especial)",
    genre: "Novela"
});
console.log("✓ Actualización:", actualizacion.message);

// Intentar actualizar libro prestado (debe fallar)
library.borrowBook(library.books[2].id, "Pedro Sánchez");
const actualizacionPrestado = library.updateBook(library.books[2].id, {
    title: "Nuevo título"
});
console.log("✗ Actualización libro prestado:", actualizacionPrestado.message);

console.log("\n6. PRUEBAS DE REPORTES Y ESTADÍSTICAS:");
console.log("-".repeat(50));

// Reporte general
const reporte = library.generateLibraryReport();
console.log("✓ Reporte general:");
console.log("  - Total libros:", reporte.totalBooks);
console.log("  - Prestados:", reporte.borrowedBooks);
console.log("  - Disponibles:", reporte.availableBooks);
console.log("  - Vencidos:", reporte.overdueBooks);
console.log("  - Multas totales:", reporte.totalFines);

// Estadísticas avanzadas
const estadisticas = library.getLibraryStats();
console.log("✓ Estadísticas avanzadas:");
console.log("  - Distribución por géneros:", estadisticas.genresDistribution);
console.log("  - Género más popular:", estadisticas.mostPopularGenre);

// Libros vencidos (simular vencimiento)
console.log("✓ Libros vencidos:", library.getOverdueBooks().length);

console.log("\n7. PRUEBAS DE ELIMINACIÓN:");
console.log("-".repeat(50));

// Eliminar libro exitosamente
const eliminacion = library.removeBookFromLibrary(library.books[0].id);
console.log("✓ Eliminación:", eliminacion.message);

// Intentar eliminar libro inexistente
const eliminacionInexistente = library.removeBookFromLibrary(999999);
console.log("✗ Eliminación libro inexistente:", eliminacionInexistente.message);

console.log("\n=== PRUEBAS COMPLETADAS ===");
console.log("Estado final de la biblioteca:");
console.log("- Total libros:", library.books.length);
console.log("- Libros prestados:", library.getBorrowedBooks().length);
console.log("- Libros disponibles:", library.getAvailableBooks().length);
