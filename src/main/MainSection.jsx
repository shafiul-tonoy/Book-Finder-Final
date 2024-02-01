/* eslint-disable no-unused-vars */
import { useState } from "react";
import BookItem from "./BookItem";
import InfoAndSearch from "./InfoAndSearch";
import Sort from "./Sort";

import { BookData } from "./Data";

export default function MainSection() {

    const [books, setBooks] = useState(BookData)

    function handleFav(bookId){
        const bookIndex = books.findIndex((book)=>book.id === bookId);
        const newBooks = [...books];
        newBooks[bookIndex].isFav = !newBooks[bookIndex].isFav ;
        setBooks(newBooks);
    }

    function handleSort(e) {
        const value = e.target.value; 
        let newBooks = [...books];

        if(value === "name_asc"){
            newBooks = newBooks.sort((a, b)=>a.name.localeCompare(b.name))
        }else if(value === "name_desc"){
            newBooks = newBooks.sort((a, b)=>b.name.localeCompare(a.name));
        }else if(value === "year_asc"){
             newBooks = newBooks.sort((a, b)=>a.publishedDate - b.publishedDate); 
        }else if(value === "year_desc"){
              newBooks = newBooks.sort((a, b)=>b.publishedDate - a.publishedDate);
        }

        setBooks(newBooks);
    }

    function handleSearch(value){
        const filtered = books.filter((book)=>
            book.name.toLowerCase().includes(value.toLowerCase())
        );

        setBooks([...filtered]);
    }

  return (
    <main className="my-10 lg:my-14">

      <header className="mb-8 lg:mb-10 mx-auto max-w-7xl">
        <div className="mx-auto flex items-end justify-between max-md:max-w-[95%] max-md:flex-col max-md:items-start max-md:space-y-4">
          <InfoAndSearch onSearch={handleSearch} />
          <Sort onSort = {handleSort} />
        </div>
      </header> 

      {/* Book Grid */}
      <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <BookItem  bookList = {books} onFav = {handleFav}/>
      </div>  

    </main>
  );
}
