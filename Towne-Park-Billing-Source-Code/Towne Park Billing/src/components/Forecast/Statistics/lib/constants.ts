import React from "react";

export const OVERNIGHT_ADJUSTMENT_RATE = 0.8;

export const HEADER_DISPLAY_NAMES: Record<string, React.ReactNode> = {
    "external-revenue": React.createElement('div', {}, ['External', React.createElement('br'), 'Revenue']),
    "valet-daily": React.createElement('div', {}, ['Valet', React.createElement('br'), 'Daily']),
    "valet-monthly": React.createElement('div', {}, ['Valet', React.createElement('br'), 'Monthly']),
    "self-daily": React.createElement('div', {}, ['Self', React.createElement('br'), 'Daily']),
    "self-monthly": React.createElement('div', {}, ['Self', React.createElement('br'), 'Monthly']),
    "valet-comps": React.createElement('div', {}, ['Valet', React.createElement('br'), 'Comps']),
    "self-comps": React.createElement('div', {}, ['Self', React.createElement('br'), 'Comps']),
    "self-aggregator": React.createElement('div', {}, ['Self', React.createElement('br'), 'Aggregator']),
    "valet-aggregator": React.createElement('div', {}, ['Valet', React.createElement('br'), 'Aggregator']),
    "drive-in-ratio-input": React.createElement('div', {}, ['Drive-In', React.createElement('br'), 'Ratio']),
    "capture-ratio-input": React.createElement('div', {}, ['Capture', React.createElement('br'), 'Ratio']),
    "type": React.createElement('div', {}, ['Type']),
    "date": React.createElement('div', {}, ['Date']),
    "valet-rate-daily": React.createElement('div', {}, ['Valet Rate', React.createElement('br'), 'Daily']),
    "valet-rate-monthly": React.createElement('div', {}, ['Valet Rate', React.createElement('br'), 'Monthly']),
    "self-rate-daily": React.createElement('div', {}, ['Self Rate', React.createElement('br'), 'Daily']),
    "self-rate-monthly": React.createElement('div', {}, ['Self Rate', React.createElement('br'), 'Monthly']),
    "base-revenue": React.createElement('div', {}, ['Base', React.createElement('br'), 'Revenue'])
}; 