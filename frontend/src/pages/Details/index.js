import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { MdEdit, MdDeleteForever, MdDateRange, MdPlace } from 'react-icons/md';

import history from '~/services/history';
import { cancelRequest } from '~/store/modules/meetup/actions';

import { Container } from './styles';

export default function Meetup() {
  const dispatch = useDispatch();

  const meetup = useSelector(state => state.meetup.selected);

  function handleClick() {
    history.push(`/meetup/${meetup.id}/edit`);
  }

  function handleCancel(id) {
    dispatch(cancelRequest(id));
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>

        <div>
          {!meetup.past && (
            <>
              <button type="button" onClick={handleClick}>
                <MdEdit size={18} />
                Editar
              </button>

              <button type="button" onClick={() => handleCancel(meetup.id)}>
                <MdDeleteForever size={18} />
                Cancelar
              </button>
            </>
          )}
        </div>
      </header>

      <section>
        <picture>
          <img src={meetup.avatar.url} alt={meetup.title} />
        </picture>

        <div>
          <p>{meetup.description}</p>
        </div>
      </section>

      <footer>
        <span>
          <MdDateRange size={18} /> {meetup.dateFormatted}
        </span>

        <span>
          <MdPlace size={18} /> {meetup.location}
        </span>
      </footer>
    </Container>
  );
}
