import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, subDays, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List, Loading, SelectDate, Button, Label } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());

  async function loadPage(
    pageNumber = page,
    shouldRefresh = false,
    dateCurr = date
  ) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const dateFormatted = format(dateCurr, 'yyyy-MM-dd');

    const response = await api.get(
      `meetups?date=${dateFormatted}&page=${pageNumber}`
    );
    const totalItems = response.data.total;

    const data = response.data.meetups.map(meetup => ({
      ...meetup,
      dateFormatted: format(parseISO(meetup.date), "dd 'de' LLLL, 'às' HH'h'", {
        locale: ptBR,
      }),
    }));

    setTotal(totalItems <= 5 ? 1 : Math.floor(totalItems / 5));
    setMeetups(shouldRefresh ? data : [...meetups, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  const loadPageCallback = useCallback(loadPage, []);

  useEffect(() => {
    loadPageCallback();
  }, [loadPageCallback]);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: ptBR }),
    [date]
  );

  async function handleSubscribe(id) {
    try {
      await api.post(`subscriptions/${id}`);

      Alert.alert('Success!', 'Successful subscription!');
    } catch (error) {
      Alert.alert(
        'Error :(',
        'You cannot subscribe to meetups already subscribed'
      );
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  async function handlePrevDay() {
    const prevDay = subDays(date, 1);

    setDate(prevDay);

    await loadPage(1, true, prevDay);
  }

  async function handleNextDay() {
    const NextDay = addDays(date, 1);

    setDate(NextDay);

    await loadPage(1, true, NextDay);
  }

  return (
    <Background>
      <Container>
        <Header />

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.3}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListHeaderComponent={
            <SelectDate>
              <Button onPress={handlePrevDay}>
                <Icon name="navigate-before" size={32} color="#fff" />
              </Button>

              <Label>{dateFormatted}</Label>

              <Button onPress={handleNextDay}>
                <Icon name="navigate-next" size={32} color="#fff" />
              </Button>
            </SelectDate>
          }
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <Meetup onClick={() => handleSubscribe(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

function BarIcon({ tintColor }) {
  return <Icon name="list" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: BarIcon,
};

BarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
