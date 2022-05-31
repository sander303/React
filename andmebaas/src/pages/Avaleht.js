import { useEffect, useState } from "react";

function Avaleht() {

    const [saadudAndmed, uuendaAndmeid] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(tagastus => tagastus.json())
    .then(data => {
        const andmed = [];
        for (const key in data) {
            andmed.push(data[key])
    }
        uuendaAndmeid(andmed);
  })
  }, []);

    return (
    
        <div>
            {saadudAndmed.map(element =>
            <div>
                <div className='title'>{element.title}</div>
                <div className='body'>{element.body}</div>
            </div>
        )}
        </div>
 
    );
}

export default Avaleht;