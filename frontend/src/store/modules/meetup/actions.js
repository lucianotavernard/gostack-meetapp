export function select(meetup) {
  return {
    type: '@meetup/SELECT',
    payload: { meetup },
  };
}

export function createRequest(data) {
  return {
    type: '@meetup/CREATE_REQUEST',
    payload: { data },
  };
}

export function createFailure() {
  return {
    type: '@meetup/CREATE_SUCCESS',
  };
}

export function updateRequest(id, data) {
  return {
    type: '@meetup/UPDATE_REQUEST',
    payload: { id, data },
  };
}

export function updateSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_SUCCESS',
    payload: { meetup },
  };
}

export function updateFailure() {
  return {
    type: '@meetup/UPDATE_FAILURE',
  };
}

export function cancelRequest(id) {
  return {
    type: '@meetup/CANCEL_REQUEST',
    payload: { id },
  };
}

export function cancelFailure() {
  return {
    type: '@meetup/CANCEL_FAILURE',
  };
}
