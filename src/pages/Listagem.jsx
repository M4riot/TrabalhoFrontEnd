import './Listagem.css'
import Logo from "../assets/img/YuGiOhLogo.webp"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { SimpleGrid, Box, Button, Spinner, Text } from '@chakra-ui/react'

const Listagem = () => {

  const [cardData, setCardData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const fetchCardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=49&offset=${page * 49}`);
      const jsonData = response.data;
      setCardData(jsonData.data);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCardData()
  }, [fetchCardData]);

  const buttons = () => {
    if (page === 0) {
      return (
        <div className='buttons'>
          <Button _hover='#df0032' bg='#df0032' color='#FFF' border='2px' borderColor='#000' onClick={handleNextPage}>Next Page</Button>
        </div>
      );
    }
    return (
      <div className='buttons'>
          <Button _hover='#df0032' bg='#df0032' color='#FFF' border='2px' borderColor='#000' onClick={handlePrevPage} disabled={page === 0}>Previous Page</Button>
          <Button _hover='#df0032' bg='#df0032' color='#FFF' border='2px' borderColor='#000' onClick={handleNextPage}>Next Page</Button>
        </div>
    );
  };

  const renderCardData = () => {
    if (loading || !cardData?.length) {
      return (
        <div className='loading'>
          <h3 className='loadingFont'>Carregando</h3>
          <div className='spinner'><Spinner size='xl' color='#000' /></div>
          
        </div>
      );
    }
    return (
      <div>
        {buttons()}
        <SimpleGrid minChildWidth='200px' spacing='10px'>
            {cardData.map((card) => (
              <Box className='card' key={card.id}>
                <Link to={`/desc/${card.id}`}><img className='card-image' src={card.card_images[0].image_url_small} alt={card.name} /></Link>
                {/* <img onClick={navigateToDesc(card.id)} className='card-image' src={card.card_images[0].image_url_small} alt={card.name} /> */}
              </Box>
              
            ))}
        </SimpleGrid>
        {buttons()}
      </div>
      
    );
  };


  return (
      <div className='background'>
      <header className='header'>
        <img src={Logo} alt='Logo Yu Gi Oh' />
      </header>
      <div className='body'>
        {renderCardData()}
      </div>
      </div>
  );
}

export default Listagem;