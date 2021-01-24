import React from 'react';

class BuscarAluno extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: 'alicia',
            isLoading: false,
            alunos: [],
            erro: '',
        };

        this.nomeOnChange = this.nomeOnChange.bind(this);
        this.buscarOnClick = this.buscarOnClick.bind(this);
    }

    nomeOnChange(event) {
        this.setState({ nome: event.target.value });
    }

    listarAlunos() {
        console.log(this.state.alunos)
        if (this.state.alunos.length > 0) {
            var listItems = this.state.alunos.map((aluno, index) =>
                <li key={index} style={{fontSize:16}}><b>{aluno.numero}</b> - {aluno.nome} - Caixa: {aluno.caixa} </li>
            )
            return (
                <ul style={{textAlign: 'left', listStyleType: "-moz-initial", listStylePosition: "inside", padding: 0 }}>{listItems}</ul>
            );

            
        }
    }

    buscarOnClick(event) {
        this.setState({
            isLoading: true,
            erro: '',
        })

        const url = 'http://177.47.183.46:8080/datasnap/rest/TServerMethods1/GetAlunos/' + this.state.nome;

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(jsondata =>

                this.setState({
                    alunos: jsondata,
                    isLoading: false,

                }, function () {
                    console.log('resultdado: '+JSON.stringify(this.state.alunos))
                })

            )
            .catch(
                // console.log("Can’t access " + url + " response. Blocked by browser?")
            );

        event.preventDefault();
    }

    render() {
        if (this.state.isLoading) {
            return <p>Buscando alunos ...</p>;
        }

        return (
            <form onSubmit={this.buscarOnClick}>
                <div style={{ display: 'flex',  }}>
                    <div style={{ justifyContent: 'flex-start' }}>
                        <label>
                            Digite o nome do aluno
                        </label>
                        <br />
                    </div>
                </div>

                <div style={{textAlign: 'left', justifyContent: 'flex-start', }}>
                    <input
                        style={{ alignSelf: 'flex-start', width: 250, marginRight: 20 }}
                        type="text"
                        value={this.state.nome}
                        onChange={this.nomeOnChange} />

                    <input
                        type="submit"
                        value="Buscar" />
                </div>


                {/* {this.state.alunos.length == 0 ?
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <label>
                                Aluno não encontrado
                        </label>
                            <br />
                        </div>
                    </div>
                    :
                    null
                } */}

                <div style={{ justifyContent: 'flex-start' }}>
                    {this.listarAlunos()}
                </div>
            </form>
        );
    }
}

export default BuscarAluno;