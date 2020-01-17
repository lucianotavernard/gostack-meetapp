import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { select } from '~/store/modules/meetup/actions';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');

      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.date),
            "dd 'de' LLLL, 'às' HH'h'",
            { locale: ptBR }
          ),
        }))
      );
    }

    loadMeetups();
  }, []);

  function handleClick(meetup) {
    dispatch(select(meetup));
    history.push(`/meetup/${meetup.id}`);
  }

  function handleCreateClick() {
    history.push('/meetup');
  }

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>

        <button type="button" onClick={handleCreateClick}>
          <MdAddCircleOutline size={18} />
          Novo Meetup
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id}>
            <strong>{meetup.title}</strong>

            <div>
              <span>{meetup.dateFormatted}</span>
              <button type="button" onClick={() => handleClick(meetup)}>
                <MdChevronRight size={24} color="#fff" />
              </button>
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
