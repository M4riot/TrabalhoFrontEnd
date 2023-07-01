import './Desc.css'
import { ChakraProvider, Box, Text, Spinner } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const Desc = ({card}) => {

    const [cardDesc, setCardDesc] = useState()
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const fetchCardDesc = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
            const jsonData = response.data;
            setCardDesc(jsonData.data);
        } catch (error) {
            console.log('Ocorreu um erro:', error);
        } finally {
            setLoading(false);
        }
      }, [id]);
    
      useEffect(() => {
        fetchCardDesc()
      }, [fetchCardDesc]);

    const navigate = useNavigate();

    const navigateToBack = () => {
        navigate(-1)
    }

    const renderCardDesc = () => {
        if (loading || !cardDesc?.length) {
            return (
              <div className='loading'>
                <h3 className='loadingFont'>Carregando</h3>
                <div className='spinner'><Spinner size='xl' color='#000' /></div>
              </div>
            );
        }
        return (
            <div>
                {cardDesc && (
                    <Box className='BoxDesc'>
                        <Box>
                            <img className='imgDesc' src={`https://images.ygoprodeck.com/images/cards/${id}.jpg`} alt={cardDesc[0].name} />
                        </Box>
                        <Box className='details'>
                            <Text className='nameCard'><b>Nome:</b> {cardDesc[0].name}</Text>
                            <Text><b>Tipo:</b> {cardDesc[0].type}</Text>
                            <Text><b>Tipo de Carta:</b> {cardDesc[0].frameType}</Text>
                            <Text><b>Raça:</b> {cardDesc[0].race}</Text>
                            <Text><b>Arquétipo:</b> {cardDesc[0].archetype}</Text>
                            <Text paddingTop='5'><b>Descrição:</b> {cardDesc[0].desc}</Text>
                        </Box>                        
                        
                    </Box>
                )}
            </div>
        )
    }

    return (
        <ChakraProvider>
            <div className='backgroundDesc'>
                <ArrowLeftIcon onClick={navigateToBack} boxSize={6} color={'#231709'} className='iconBack'/>
                <pre>{card}</pre>
                {renderCardDesc()}
            </div>
        </ChakraProvider>
    );
}

export default Desc;