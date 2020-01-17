import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Subscription from '~/components/Subscription';

import { Container, List, Loading } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get('subscriptions');
    const totalItems = response.data.total;

    const data = response.data.subscriptions.map(subscription => ({
      ...subscription,
      Meetup: {
        ...subscription.Meetup,
        dateFormatted: format(
          parseISO(subscription.Meetup.date),
          "dd 'de' LLLL, 'às' HH'h'",
          { locale: ptBR }
        ),
      },
    }));

    setTotal(totalItems <= 10 ? 1 : Math.floor(totalItems / 10));
    setSubscriptions(shouldRefresh ? data : [...subscriptions, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  const loadPageCallback = useCallback(loadPage, []);

  useEffect(() => {
    loadPageCallback();
  }, [loadPageCallback]);

  async function handleCancel(id) {
    await api.delete(`subscriptions/${id}`);

    setSubscriptions(
      subscriptions.filter(subscription => subscription.id !== id)
    );
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  return (
    <Background>
      <Container>
        <Header />

        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.3}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <Subscription
              data={item.Meetup}
              onCancel={() => handleCancel(item.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

function BarIcon({ tintColor }) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: BarIcon,
};

BarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
