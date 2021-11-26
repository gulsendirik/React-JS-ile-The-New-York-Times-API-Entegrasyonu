import './App.css';
import Item from './Item';
import React, {useState, useEffect} from 'react';
import axios from "axios";

const API_KEY = "t1xVobOEojhHpkI1wHRV53TpU2hwWNWl";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const searchAPI = () => {
    if(query == ''){alert('Arama Kelimesi Giriniz'); return;}
    setLoading(true);
    axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${encodeURIComponent(query)}&offset=${currentPage}&api-key=${API_KEY}`).then((res) =>{
      if(res.data.status == 'OK')
      {
        console.log(res);
        setData(res.data.results == null ? [] : res.data.results);
        setHasMore(res.data.has_more);
        setLoading(false);
      }
      else {
        alert("Bir hata oluştu");
      }
     
    })
    .catch((error) => {
      console.log(error);
    })
  };

  useEffect(() => {
    if(query != '')
    {
      setData([]);
      searchAPI()
    }
  },[currentPage]);

  return (
    <div>
      <div className="search-area">
        <div>
          <input className="input" type="text" onChange={(event) => setQuery(event.target.value)} value={query} />
          <button onClick={searchAPI}>Search</button>
        </div>
        <div>{loading && <span>Yükleniyor...</span> }</div>
      </div>
      <div className="item-area">
        
        {data.length>0 && data.map((item) => <Item item={item} />)}
      </div>

      <div className="pagination">
      {hasMore && currentPage > 0 &&
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)}>Geri</button>
          </div>
        }
        {hasMore && 
          <div>
            <button onClick={() => setCurrentPage(currentPage + 1)}>İleri</button>
          </div>
        }
      </div>


    </div>
  );
}

export default App;
