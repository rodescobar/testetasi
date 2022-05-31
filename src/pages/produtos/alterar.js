import { useState } from 'react'

import {
    Typography,
    Box,
    TextField,
    Button
} from '@mui/material'

import { useLocation } from 'react-router-dom'

import Swal from 'sweetalert2'

import api from '../../service/apiaxios'

const url = '/app/produtos'

const ProdutoAlterar = () => {
    const recebido = useLocation()

    const [ id, setId ] = useState( recebido.state._id )
    const [ nome, setNome ] = useState( recebido.state.nome )
    const [ preco, setPreco ] = useState( recebido.state.preco )
    const [ quantidade, setQuantidade ] = useState( recebido.state.quantidade )
    const [ descricao, setDescricao ] = useState( recebido.state.descricao )

    console.log( recebido.state )

    const Alterar = async() => {
        var data = {
            id,
            nome,
            preco,
            quantidade,
            descricao
        }

        await api.put( '/app/produtos', 
                        data
                      )
                    .then( retorno => {
                        if ( retorno.data.erro )
                            Swal.fire({
                                title: retorno.data.erro,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            })

                        if ( retorno.data._id ) {
                            Swal.fire({
                                title: "Produto alterado com sucesso",
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            window.location = "/admin/produtos"
                        }
                    })
    }

    return (
        <Box style={{ padding: '10px' }}>
            <Typography variant="h5">
                Alterar Produto
            </Typography>
            <TextField
                variant='outlined'
                label="Nome"
                onChange={ (e) => setNome(e.target.value) }
                value={ nome }
            />
            <TextField
                variant='outlined'
                label="Preço"
                onChange={ (e) => setPreco(e.target.value) }
                value={ preco }
            />
            <TextField
                variant='outlined'
                label="Quantidade"
                onChange={ (e) => setQuantidade(e.target.value) }
                value={ quantidade }
            />
            <TextField
                variant='outlined'
                label="Descrição"
                onChange={ (e) => setDescricao(e.target.value) }
                value={ descricao }
            />
            <Button 
                color="primary"
                variant="contained"
                onClick={ () => Alterar() }
            >
                Alterar Produto
            </Button>
        </Box>
    )
}

export default ProdutoAlterar