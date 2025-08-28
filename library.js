class Library {
    constructor() {
        this.books = []; // Array para almacenar los libros
        this.borrowedBooks = new Map(); // Mapa para almacenar los libros prestados
    }

    createBook(title, author, genre, isbn) {
        // Validación de campos obligatorios
        if (!title || !author || !genre || !isbn) {
            throw new Error("Todos los campos (título, autor, género, ISBN) son obligatorios");
        }

        return {
            id: Date.now(), // ID único basado en el timestamp actual
            title,
            author,
            genre,
            isbn,
            isAvailable: true, // Indica si el libro está disponible
            borrowedBy: null, // Nombre del prestatario (null si no está prestado)
            borrowedAt: null, // Fecha de préstamo (null si no está prestado)
            dueDate: null, // Fecha de vencimiento (null si no está prestado)
            createdAt: new Date() // Fecha de creación del libro
        };
    }

    addBookToLibrary(title, author, genre, isbn) {
        try {
            const book = this.createBook(title, author, genre, isbn); // Crea un nuevo libro
            this.books.push(book); // Agrega el libro al array de libros
            return { success: true, message: "Libro agregado exitosamente", book };
        } catch (error) {
            return { success: false, message: error.message, book: null };
        }
    }

    removeBookFromLibrary(id) {
        const index = this.books.findIndex(book => book.id === id); // Busca el índice del libro por ID
        if (index !== -1) {
            const removedBook = this.books.splice(index, 1)[0]; // Elimina el libro del array
            // Si el libro estaba prestado, también lo eliminamos del mapa de libros prestados
            if (this.borrowedBooks.has(id)) {
                this.borrowedBooks.delete(id);
            }
            return { success: true, message: "Libro eliminado exitosamente", book: removedBook };
        }
        return { success: false, message: "Libro no encontrado", book: null };
    }

    borrowBook(bookId, borrowerName, days = 14) {
        const book = this.books.find(b => b.id === bookId); // Busca el libro por ID
        
        if (!book) {
            return { success: false, message: "Libro no encontrado en la biblioteca", book: null, dueDate: null };
        }
        
        if (!book.isAvailable) {
            return { success: false, message: "El libro no está disponible", book: null, dueDate: null };
        }

        if (!borrowerName) {
            return { success: false, message: "Nombre del prestatario es requerido", book: null, dueDate: null };
        }

        book.isAvailable = false; // Marca el libro como no disponible
        book.borrowedBy = borrowerName; // Asigna el nombre del prestatario
        book.borrowedAt = new Date(); // Registra la fecha de préstamo
        book.dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000); // Calcula la fecha de vencimiento
        this.borrowedBooks.set(bookId, book); // Agrega el libro al mapa de libros prestados
        
        return { 
            success: true, 
            message: "Libro prestado exitosamente", 
            book, 
            dueDate: book.dueDate 
        };
    }

    returnBook(bookId) {
        const book = this.borrowedBooks.get(bookId); // Busca el libro en el mapa de libros prestados
        
        if (!book) {
            // Verificar si el libro existe pero no está prestado
            const libraryBook = this.books.find(b => b.id === bookId);
            if (libraryBook) {
                return { success: false, message: "El libro no está prestado actualmente", fine: 0 };
            }
            return { success: false, message: "Libro no encontrado en la biblioteca", fine: 0 };
        }

        const fine = this.calculateFine(book.dueDate); // Calcula la multa si hay retraso
        book.isAvailable = true; // Marca el libro como disponible
        book.borrowedBy = null; // Restablece el prestatario a null
        book.borrowedAt = null; // Restablece la fecha de préstamo a null
        book.dueDate = null; // Restablece la fecha de vencimiento a null
        this.borrowedBooks.delete(bookId); // Elimina el libro del mapa de libros prestados
        
        return { 
            success: true, 
            message: "Libro devuelto exitosamente", 
            fine,
            book 
        };
    }

    calculateFine(dueDate, fineRate = 0.50) {
        if (!dueDate) return 0;
        
        const today = new Date(); // Obtiene la fecha actual
        const overdueDays = Math.max(0, Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24))); // Calcula los días de retraso
        return parseFloat((overdueDays * fineRate).toFixed(2)); // Retorna la multa total con 2 decimales
    }

    searchBooks(criteria) {
        if (!criteria || criteria.trim() === '') {
            return this.books; // Retorna todos los libros si no hay criterio de búsqueda
        }
        
        return this.books.filter(book => 
            book.title.toLowerCase().includes(criteria.toLowerCase()) || // Filtra por título
            book.author.toLowerCase().includes(criteria.toLowerCase()) || // Filtra por autor
            book.genre.toLowerCase().includes(criteria.toLowerCase()) || // Filtra por género
            book.isbn.toLowerCase().includes(criteria.toLowerCase()) // Filtra por ISBN
        );
    }

    getBooksByGenre(genre) {
        if (!genre) return this.books;
        return this.books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    }

    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable);
    }

    getBorrowedBooks() {
        return Array.from(this.borrowedBooks.values());
    }

    updateBook(bookId, updates) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) {
            return { success: false, message: "Libro no encontrado" };
        }

        // Validar que el libro no esté prestado para ciertas actualizaciones
        if (!book.isAvailable && (updates.title || updates.author || updates.isbn)) {
            return { success: false, message: "No se puede modificar un libro prestado" };
        }

        // Aplicar actualizaciones
        if (updates.title) book.title = updates.title;
        if (updates.author) book.author = updates.author;
        if (updates.genre) book.genre = updates.genre;
        if (updates.isbn) book.isbn = updates.isbn;

        return { success: true, message: "Libro actualizado exitosamente", book };
    }

    getOverdueBooks(fineRate = 0.50) {
        const today = new Date(); // Obtiene la fecha actual
        return Array.from(this.borrowedBooks.values())
            .filter(book => book.dueDate && book.dueDate < today) // Filtra libros vencidos
            .map(book => ({
                id: book.id, // ID del libro
                title: book.title, // Título del libro
                borrowedBy: book.borrowedBy, // Prestatario
                dueDate: book.dueDate, // Fecha de vencimiento
                overdueDays: Math.ceil((today - book.dueDate) / (1000 * 60 * 60 * 24)), // Días de retraso
                fine: this.calculateFine(book.dueDate, fineRate) // Calcula la multa
            }));
    }

    generateLibraryReport() {
        const totalBooks = this.books.length; // Total de libros en la biblioteca
        const borrowedCount = this.borrowedBooks.size; // Cantidad de libros prestados
        const availableCount = totalBooks - borrowedCount; // Cantidad de libros disponibles
        const overdueBooks = this.getOverdueBooks(0.50); // Obtiene libros vencidos
        const totalFines = overdueBooks.reduce((sum, book) => sum + book.fine, 0); // Suma total de multas

        return {
            totalBooks, // Total de libros
            borrowedBooks: borrowedCount, // Cantidad de libros prestados
            availableBooks: availableCount, // Cantidad de libros disponibles
            overdueBooks: overdueBooks.length, // Cantidad de libros vencidos
            totalFines: parseFloat(totalFines.toFixed(2)), // Suma total de multas con 2 decimales
            overdueBooksDetails: overdueBooks // Detalles de libros vencidos
        };
    }

    // Método para obtener estadísticas adicionales
    getLibraryStats() {
        const report = this.generateLibraryReport();
        const genres = {};
        
        this.books.forEach(book => {
            genres[book.genre] = (genres[book.genre] || 0) + 1;
        });

        return {
            ...report,
            genresDistribution: genres,
            mostPopularGenre: Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b, '')
        };
    }
}

module.exports = Library; // Exporta la clase para usarla en otros archivos
