const Library = require('./library.js');

console.log("📚 SISTEMA DE GESTIÓN DE BIBLIOTECA AVANZADO");
console.log("=".repeat(50));

// Crear instancia de la biblioteca
const biblioteca = new Library();

// Ejemplo de uso demostrativo
console.log("\n🎯 EJEMPLO PRÁCTICO DE USO:");
console.log("-".repeat(30));

// Agregar algunos libros de ejemplo
console.log("\n1. AGREGANDO LIBROS:");
const libro1 = biblioteca.addBookToLibrary("El Principito", "Antoine de Saint-Exupéry", "Ficción", "9788478887200");
console.log("   ✓", libro1.message);

const libro2 = biblioteca.addBookToLibrary("1984", "George Orwell", "Ciencia Ficción", "9780451524935");
console.log("   ✓", libro2.message);

const libro3 = biblioteca.addBookToLibrary("Cien años de soledad", "Gabriel García Márquez", "Realismo mágico", "9788437604947");
console.log("   ✓", libro3.message);

const libro4 = biblioteca.addBookToLibrary("Don Quijote de la Mancha", "Miguel de Cervantes", "Novela", "9788467033758");
console.log("   ✓", libro4.message);

// Mostrar estado inicial
console.log("\n2. ESTADO INICIAL:");
console.log("   Total de libros:", biblioteca.books.length);
console.log("   Libros disponibles:", biblioteca.getAvailableBooks().length);

// Realizar un préstamo
console.log("\n3. REALIZANDO PRÉSTAMO:");
const prestamo = biblioteca.borrowBook(libro1.book.id, "María González", 7);
console.log("   ✓", prestamo.message);
if (prestamo.success) {
    console.log("   Fecha de vencimiento:", prestamo.dueDate.toLocaleDateString());
}

// Mostrar libros prestados
console.log("\n4. LIBROS PRESTADOS ACTUALMENTE:");
const prestados = biblioteca.getBorrowedBooks();
prestados.forEach(libro => {
    console.log("   📖", libro.title, "- Prestatario:", libro.borrowedBy);
});

// Realizar una búsqueda
console.log("\n5. BÚSQUEDA DE LIBROS:");
const resultados = biblioteca.searchBooks("cien");
console.log("   Resultados para 'cien':", resultados.length, "libros encontrados");
resultados.forEach(libro => {
    console.log("   •", libro.title, "by", libro.author);
});

// Generar reporte completo
console.log("\n6. REPORTE COMPLETO DE LA BIBLIOTECA:");
const reporte = biblioteca.generateLibraryReport();
console.log("   📊 ESTADÍSTICAS:");
console.log("   - Total de libros:", reporte.totalBooks);
console.log("   - Libros prestados:", reporte.borrowedBooks);
console.log("   - Libros disponibles:", reporte.availableBooks);
console.log("   - Libros vencidos:", reporte.overdueBooks);
console.log("   - Multas acumuladas: $", reporte.totalFines);

// Estadísticas avanzadas
console.log("\n7. ESTADÍSTICAS AVANZADAS:");
const stats = biblioteca.getLibraryStats();
console.log("   📈 DISTRIBUCIÓN POR GÉNEROS:");
Object.entries(stats.genresDistribution).forEach(([genero, cantidad]) => {
    console.log("   -", genero + ":", cantidad, "libros");
});
console.log("   🏆 Género más popular:", stats.mostPopularGenre);

console.log("\n8. PRUEBA DE MANEJO DE ERRORES:");
// Intentar prestar libro ya prestado
const errorPrestamo = biblioteca.borrowBook(libro1.book.id, "Juan Pérez");
console.log("   ❌ Intentar prestar libro ya prestado:", errorPrestamo.message);

// Intentar agregar libro inválido
const libroInvalido = biblioteca.addBookToLibrary("", "Autor", "Género", "");
console.log("   ❌ Libro con datos faltantes:", libroInvalido.message);

console.log("\n🎉 SISTEMA LISTO PARA USO!");
console.log("\n💡 Tip: Ejecuta 'npm test' para ver pruebas completas del sistema");
console.log("💡 Tip: Ejecuta 'npm start' para ver este demo nuevamente");
console.log("\n" + "=".repeat(50));
console.log("¡Sistema de gestión de biblioteca inicializado correctamente! 🚀");
