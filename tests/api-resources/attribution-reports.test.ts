// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource attributionReports', () => {
  test('list', async () => {
    const responsePromise = client.attributionReports.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.attributionReports.list(
        {
          cursor: 'cursor',
          limit: 0,
          search: 'search',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.attributionReports.create({
      definition: {
        kind: 'attribution',
        outcomes: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            eventNames: ['x'],
            label: 'x',
          },
        ],
        version: 1,
      },
      name: 'x',
      reportContext: { dateRange: { from: '7321-69-10', to: '7321-69-10' } },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.attributionReports.create({
      definition: {
        kind: 'attribution',
        outcomes: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            eventNames: ['x'],
            label: 'x',
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            value: {
              path: ['x'],
              property: 'event.properties',
              type: 'number',
            },
          },
        ],
        version: 1,
        counting: 'unique',
        currency: 'USD',
        filter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
        lookbackDays: 7,
        model: 'first_touch',
      },
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          to: '7321-69-10',
          timeZone: 'UTC',
        },
      },
      description: 'description',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.attributionReports.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.attributionReports.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.attributionReports.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      definition: {
        kind: 'attribution',
        outcomes: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            eventNames: ['x'],
            label: 'x',
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            value: {
              path: ['x'],
              property: 'event.properties',
              type: 'number',
            },
          },
        ],
        version: 1,
        counting: 'unique',
        currency: 'USD',
        filter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
        lookbackDays: 7,
        model: 'first_touch',
      },
      description: 'description',
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          to: '7321-69-10',
          timeZone: 'UTC',
        },
      },
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.attributionReports.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.attributionReports.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('duplicate: only required params', async () => {
    const responsePromise = client.attributionReports.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('duplicate: required and optional params', async () => {
    const response = await client.attributionReports.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('preview: only required params', async () => {
    const responsePromise = client.attributionReports.preview({
      input:
        '{"definition":{"version":1,"kind":"attribution","outcomes":[{"id":"11111111-1111-4111-8111-111111111111","label":"Bookings","eventNames":["appointment_booked"]}],"model":"last_touch","counting":"unique","lookbackDays":30,"currency":"USD"},"from":"2026-09-01","to":"2026-09-30","comparison":{"kind":"previous_period"}}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preview: required and optional params', async () => {
    const response = await client.attributionReports.preview({
      input:
        '{"definition":{"version":1,"kind":"attribution","outcomes":[{"id":"11111111-1111-4111-8111-111111111111","label":"Bookings","eventNames":["appointment_booked"]}],"model":"last_touch","counting":"unique","lookbackDays":30,"currency":"USD"},"from":"2026-09-01","to":"2026-09-30","comparison":{"kind":"previous_period"}}',
    });
  });

  test('visitors: only required params', async () => {
    const responsePromise = client.attributionReports.visitors({
      input:
        '{"definition":{"version":1,"kind":"attribution","outcomes":[{"id":"11111111-1111-4111-8111-111111111111","label":"Bookings","eventNames":["appointment_booked"]}],"model":"last_touch","counting":"unique","lookbackDays":30,"currency":"USD"},"from":"2026-09-01","to":"2026-09-30","comparison":{"kind":"previous_period"},"selection":{"outcomeId":"11111111-1111-4111-8111-111111111111","period":"current","grain":"source_medium","channel":"Paid search","sourceMedium":"google / cpc","touchRole":"last"},"limit":25}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('visitors: required and optional params', async () => {
    const response = await client.attributionReports.visitors({
      input:
        '{"definition":{"version":1,"kind":"attribution","outcomes":[{"id":"11111111-1111-4111-8111-111111111111","label":"Bookings","eventNames":["appointment_booked"]}],"model":"last_touch","counting":"unique","lookbackDays":30,"currency":"USD"},"from":"2026-09-01","to":"2026-09-30","comparison":{"kind":"previous_period"},"selection":{"outcomeId":"11111111-1111-4111-8111-111111111111","period":"current","grain":"source_medium","channel":"Paid search","sourceMedium":"google / cpc","touchRole":"last"},"limit":25}',
    });
  });

  test('insights: only required params', async () => {
    const responsePromise = client.attributionReports.insights({
      input:
        '{"definition":{"version":1,"kind":"attribution","outcomes":[{"id":"11111111-1111-4111-8111-111111111111","label":"Bookings","eventNames":["appointment_booked"]}],"model":"last_touch","counting":"unique","lookbackDays":30,"currency":"USD"},"from":"2026-09-01","to":"2026-09-30","comparison":{"kind":"previous_period"}}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('insights: required and optional params', async () => {
    const response = await client.attributionReports.insights({
      input:
        '{"definition":{"version":1,"kind":"attribution","outcomes":[{"id":"11111111-1111-4111-8111-111111111111","label":"Bookings","eventNames":["appointment_booked"]}],"model":"last_touch","counting":"unique","lookbackDays":30,"currency":"USD"},"from":"2026-09-01","to":"2026-09-30","comparison":{"kind":"previous_period"}}',
    });
  });
});
