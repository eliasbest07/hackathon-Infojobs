const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

var myHeaders = new Headers();
myHeaders.append("Authorization",  `Basic ${infoJobsToken}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    
export  async function getJobs(url){
    const res= await fetch(url, requestOptions)
    const data = await res.json();

    await Promise.all( // esto es una locura, no encontre otra forma de hacerlo
        data.items.map(async (item) => {
            const description = await getDescription(item.id);
            item.description = description.data;
        })
    );

    return { data: data.items };
}

export async function getDescription(id){
    const res= await fetch(`https://api.infojobs.net/api/7/offer/${id}`, requestOptions)
    const data = await res.json();
    
    return { data: data.description };
}
