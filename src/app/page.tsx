'use client';

import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import styles from './savings.module.scss';

export default function Home() {
  const channels = [
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'google-ads', label: 'Google Ads' },
    { id: 'sales-messages', label: 'Sales Messages' },
    { id: 'interne commmunicatie', label: 'interne communicatie' },
  ];

  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'linkedin',
  ]);
  const [postsPerWeek, setPostsPerWeek] = useState<number>(3);
  const [countries, setCountries] = useState<number>(1);
  const [timeSpentPerPost, setTimeSpentPerPost] = useState<number>(1);
  const [hourlyRate, setHourlyRate] = useState<number>(60);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [estimatedSavings, setEstimatedSavings] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<string>('jaar');
  const savingPercentage = 90;

  useEffect(() => {
    calculateSavings();
  }, [
    selectedChannels,
    postsPerWeek,
    countries,
    timeSpentPerPost,
    hourlyRate,
    timeInterval,
  ]);

  const handleChannelChange = (e: { target: { value: any } }) => {
    const selectedChannels = e.target.value;
    setSelectedChannels(selectedChannels);
  };

  const handleCalculate = () => {
    calculateSavings();
  };

  function formatMoney(amount: number) {
    return amount.toLocaleString('nl-NL');
  }

  const calculateSavings = () => {
    const totalPosts = postsPerWeek * 52 * selectedChannels.length;
    const totalHoursSaved = totalPosts * timeSpentPerPost;
    const totalCost = totalHoursSaved * hourlyRate;
    const totalSavings = totalCost * (savingPercentage / 100);
    let totalCostPerInterval = 0;
    let savingsPerInterval = 0;

    switch (timeInterval) {
      case 'dag':
        totalCostPerInterval = totalCost / 365;
        savingsPerInterval = totalSavings / 365;
        break;
      case 'week':
        totalCostPerInterval = totalCost / 52;
        savingsPerInterval = totalSavings / 52;

        break;
      case 'maand':
        totalCostPerInterval = totalCost / 12;
        savingsPerInterval = totalSavings / 12;
        break;
      case 'jaar':
        totalCostPerInterval = totalCost;
        savingsPerInterval = totalSavings;
        break;
      default:
        savingsPerInterval = 0;
    }

    setEstimatedSavings(savingsPerInterval);
    setTotalCost(totalCostPerInterval);
  };

  return (
    <div id={styles.savingsCalculator}>
      <div className={styles.gridContainer}>
        <div className={styles.topRow}>
          <Typography variant="h4">Savings Calculator</Typography>
          <Typography variant="h6">
            Wat we voor je kunnen betekenen uitgedrukt in cijfers
          </Typography>
        </div>
        <div className={styles.middleRow}>
          <div className={styles.leftColumn}>
            {' '}
            <Box>
              <Box sx={{ width: 200, marginBottom: 2 }}>
                <Typography variant="subtitle1">Channels Used</Typography>
                {JSON.stringify(selectedChannels)}
                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectedChannels}
                    onChange={handleChannelChange}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gridGap: '10px',
                    }}
                  >
                    {channels.map((channel) => (
                      <FormControlLabel
                        key={channel.id}
                        value={channel.id}
                        control={<Radio />}
                        label={channel.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ width: 200, marginBottom: 2 }}>
                <Typography variant="subtitle1">
                  Posts per Week per Channel
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    inputProps={{ min: 1, max: 21 }}
                    value={postsPerWeek}
                    onChange={(e: { target: { value: string } }) =>
                      setPostsPerWeek(parseInt(e.target.value))
                    }
                  />
                </FormControl>
              </Box>

              <Box sx={{ width: 200, marginBottom: 2 }}>
                <Typography variant="subtitle1">Countries</Typography>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    inputProps={{ min: 1, max: 21 }}
                    value={countries}
                    onChange={(e: { target: { value: string } }) =>
                      setCountries(parseInt(e.target.value))
                    }
                  />
                </FormControl>
              </Box>
            </Box>
          </div>
          <div className={styles.centerColumn}>
            {' '}
            <Box>
              <Box sx={{ width: 200, marginBottom: 2 }}>
                <Typography variant="subtitle1">
                  Time Spent per Post (in hours)
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    inputProps={{ min: 0 }}
                    value={timeSpentPerPost}
                    onChange={(e: { target: { value: string } }) =>
                      setTimeSpentPerPost(parseInt(e.target.value))
                    }
                  />
                </FormControl>
              </Box>

              <Box sx={{ width: 200, marginBottom: 2 }}>
                <Typography variant="subtitle1">
                  Hourly Rate of the Employee (in euros)
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    inputProps={{ min: 0 }}
                    value={hourlyRate}
                    onChange={(e: { target: { value: string } }) =>
                      setHourlyRate(parseInt(e.target.value))
                    }
                  />
                </FormControl>
              </Box>

              <Box sx={{ width: 200, marginBottom: 2 }}>
                <Typography variant="subtitle1">Time Interval</Typography>
                <FormControl fullWidth>
                  <Select
                    value={timeInterval}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setTimeInterval(e.target.value)}
                  >
                    <MenuItem value="dag">Dag</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="maand">Maand</MenuItem>
                    <MenuItem value="jaar">Jaar</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Typography variant="h6">
                <span style={{ color: 'red', textDecoration: 'line-through' }}>
                  €{formatMoney(totalCost)}
                </span>{' '}
                per {timeInterval} !
              </Typography>

              <Typography variant="h6">
                * Met Stencil bespaar jij tot{' '}
                <span style={{ color: 'green' }}>
                  €{formatMoney(estimatedSavings)}
                </span>{' '}
                per {timeInterval} !
              </Typography>
              <Button
                variant="contained"
                onClick={handleCalculate}
                sx={{ marginBottom: 2 }}
              >
                Begin met besparen!
              </Button>
            </Box>
          </div>
          <div className={styles.rightColumn}>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>
              Andere voordelen
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <span role="img" aria-label="checkmark">
                  ✅
                </span>
                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                  Geen huisstijlpolitie meer nodig
                </Typography>
              </li>
              <li>
                <span role="img" aria-label="checkmark">
                  ✅
                </span>
                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                  Meer tijd voor
                </Typography>
              </li>
              <li>
                <span role="img" aria-label="checkmark">
                  ✅
                </span>
                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                  Schaalbaar
                </Typography>
              </li>
              <li>
                <span role="img" aria-label="checkmark">
                  ✅
                </span>
                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                  Kortere doorlooptijd
                </Typography>
              </li>
              <li>
                <span role="img" aria-label="checkmark">
                  ✅
                </span>
                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                  Zelf in controle
                </Typography>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomRow}>
          * aan dit rekenvoorbeeld kunnen geen rechten worden ontleend, <br /> s
          <a>neem contact met ons op</a> voor een <a>offerte</a> of{' '}
          <a>vrijblijvend adviesgesprek.</a>
        </div>
      </div>
    </div>
  );
}
