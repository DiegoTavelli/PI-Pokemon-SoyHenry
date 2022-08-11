import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPokemon } from 'store/actions/createPokemonActions';
import { getPokemons } from 'store/actions/pokemonActions';
import rollingPokeball from '../../images/rollingPokeball.gif'
import createYourOwn from '../../images/create your own.png'
import pokemonBanner from '../../images/pokemon.png'
import ballWaiting from 'images/ballWaiting.gif'
import loading from 'images/loading.png'
import './createPokemon.css'


function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((store) => store.types);
  // const pokemons = useSelector((store) => store.pokemons);
  const [error, setError] = useState('');
  const [state, setState] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    typeOne: '',
    typeTwo: '',
    image: '',
  })
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    typeOne,
    typeTwo
  } = state;

  function validateString(e) {
    if (!/^[a-z\s]{0,255}$/i.test(e.target.value)) {
      setError('Name must contains only letters');
    } else {
      setError('');
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleChangeImage(e) {
    if (!/[a]/.test(e.target.value)) {
      setError('');
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function validateNumber(e) {
    if (!/^[0-9]\d*$/.test(e.target.value)) {
      setError(`${e.target.name} must contain only numbers`)
    } else {
      setError('');
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  }

  // let ready = false;
  // const finalValidation = () => {
  //   return name === '' ? alert('You must enter the name') :
  //     hp === '' ? alert('You must enter Hp value') :
  //       attack === '' ? alert('You must enter Attack value') :
  //         defense === '' ? alert('You must enter Defense value') :
  //           speed === '' ? alert('You must enter Speed value') :
  //             height === '' ? alert('You must enter Height value') :
  //               weight === '' ? alert('You must enter Weight value') :
  //                 attack === '' ? alert('You must enter Attack value') :
  //                   typeOne === '' ? alert('You must enter Primary Type at least') :
  //                     ready = true;
  // }

  const finalValidation = () => {
    if (!name || !hp || !attack || !defense || !speed || !height || !weight || !typeOne) {
      setError('e')
    }
  }

  const pushIfReady = () => {
    finalValidation();
    dispatch(createPokemon(state))
    dispatch(getPokemons())
    alert('🎉 Pokemon successfully created! 🥳');
    history.push(`/pokemons`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    pushIfReady();
  }

  return !createYourOwn || !rollingPokeball || !pokemonBanner ?
    <div>
      <img src={ballWaiting} alt=' ' className='waitingBall' />
      <br></br>
      <img src={loading} alt='Loading...' className='loading' />
    </div>
    :
    <div className='container'>
      <div className='contImages' >
        <img className='createYourOwn' src={createYourOwn} alt='' />
        <img className='gifCreate' src={rollingPokeball} alt='' />
        <img className='pokemonBanner' src={pokemonBanner} alt='' />
      </div>
      <form type='submit' className='createForm'>
        {!error ? null : <span className='error'>{error}</span>}
        <label className='labelNames' >Name</label>
        <input
          autoComplete='off'
          className={error ? error && 'createInputs' : 'createInputs'}
          name='name'
          placeholder='name'
          value={name}
          onChange={(e) => validateString(e)}
        ></input>
        <label className='labelNames' >Hp</label>
        <input
          autoComplete='off'
          className='createInputs'
          name='hp'
          placeholder='hp'
          value={hp}
          onChange={(e) => validateNumber(e)}
        ></input>
        {/* {!error ? null : <span className='error'>{error}</span>} */}
        <label className='labelNames' >Attack</label>
        <input
          autoComplete='off'
          className='createInputs'
          name='attack'
          placeholder='attack'
          value={attack}
          onChange={(e) => validateNumber(e)}
        ></input>
        {/* {!error ? null : <span className='error'>{error}</span>} */}
        <label className='labelNames' >Defense</label>
        <input
          autoComplete='off'
          className='createInputs'
          name='defense'
          placeholder='defense'
          value={defense}
          onChange={(e) => validateNumber(e)}
        ></input>
        {/* {!error ? null : <span className='error'>{error}</span>} */}
        <label className='labelNames' >Speed</label>
        <input
          autoComplete='off'
          className='createInputs'
          name='speed'
          placeholder='speed'
          value={speed}
          onChange={(e) => validateNumber(e)}
        ></input>
        {/* {!error ? null : <span className='error'>{error}</span>} */}
        <label className='labelNames' >Height</label>
        <input
          autoComplete='off'
          className='createInputs'
          name='height'
          placeholder='height'
          value={height}
          onChange={(e) => validateNumber(e)}
        ></input>
        {/* {!error ? null : <span className='error'>{error}</span>} */}
        <label className='labelNames' >Weight</label>
        <input
          autoComplete='off'
          className='createInputs'
          name='weight'
          placeholder='weight'
          value={weight}
          onChange={(e) => validateNumber(e)}
        ></input>
        {/* {!error ? null : <span className='error'>{error}</span>} */}
        <label className='labelNames' >Image</label>
        <input
          autoComplete='off'
          className='createInputs'
          name='image'
          placeholder='image'
          value={image}
          onChange={(e) => handleChangeImage(e)}
        ></input>
        {/* {!error ? null : <span className='error'>{error}</span>} */}
        <label className='labelNames' >Primary Type</label>
        <select
          className='selectOptionCreate'
          name='typeOne'
          value={typeOne}
          onChange={(e) => handleChange(e)}
        >
          {types &&
            types.map((type, i) => (
              <option key={i} value={type.name} name={type.name} placeholder=' ' >
                {type.name}
              </option>
            ))}
          <option defaultValue='default'>
            {null}
          </option>
        </select>

        <label className='labelNames' >Secundary Type</label>
        <select
          className='selectOptionCreate'
          name='typeTwo'
          value={typeTwo}
          onChange={(e) => handleChange(e)}
        >
          {types &&
            types.map((type, i) => (
              <option key={i} value={type.name} name={type.name}  >
                {type.name}
              </option>
            ))}
          <option defaultValue={null}>
            {null}
          </option>
        </select>

        <button
          className='createButtonPkm'
          type='submit'
          onClick={(e) => handleSubmit(e)}
          disabled={error}
        >
          Create Pokemon
        </button>
      </form>
    </div >


}

export default CreatePokemon;
