import { useNavigate } from 'react-router-dom';


export default function Home(){
    const navigate = useNavigate();
    

    return(
        <>
            <button className={"px-4 py-2 rounded-md border  bg-gray-800 text-white"} onClick={()=>navigate('/new-wallet')}>Create New Wallet</button>
            <button className={"px-4 py-2 rounded-md border  bg-gray-800 text-white m-5"} onClick={() => navigate('/import')}>I already have a wallet</button>

        </>

    )
}