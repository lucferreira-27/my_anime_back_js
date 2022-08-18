import useFetch from "../../static/hooks/useFetch";

const useFetchContent = (id,category) => {
    console.log(id)
    const url  = `https://myanimelist.net/${category}/${id}`
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "urls": [url] })
    };
    return useFetch('http://localhost:9000/statistics/',options)
}

export default useFetchContent;