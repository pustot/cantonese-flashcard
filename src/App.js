import "purecss/build/pure.css";
import React, { useState, useEffect } from "react";
import "./styles.scss";
import FlashCard from "./components/FlashCard";
import { 
  Button, Container, CssBaseline, FormControl, 
  InputLabel, MenuItem, Select, Stack, Typography
} from '@mui/material';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { promiseDataSmall, promiseDataLarge } from "./api/data";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [lang, setLang] = React.useState('en');
  const [pronunciationDataLarge, setPronunciationDataLarge] = React.useState([['字', 'zi6']]);
  const [char, setChar] = React.useState('字');
  const [roma, setRoma] = React.useState('zi6');

  const handleLangChange = (event) => {
    setLang(event.target.value);
  };

  const getLocaleText = (i18nText, language) => {
    return language in i18nText? i18nText[language] : i18nText["en"];
  };

  useEffect(() => {
    (async () => {
      // const [pronunciationDataSmall, pronunciationDataLarge] =
      //   await Promise.all([promiseDataSmall, promiseDataLarge]);
      // setPronunciationDataSmall(pronunciationDataSmall);
      const pronunciationDataLarge0 = await promiseDataLarge;
      setPronunciationDataLarge(pronunciationDataLarge0);
    })();
  }, []);

  useEffect(() => {
    const boardEvent = window.setInterval(refreshBoard, 5000);
    return () => {
      window.clearInterval(boardEvent);
    };
  });

  const refreshBoard = () => {
    const idx = Math.floor(Math.random() * pronunciationDataLarge.length);
    const [nextchar, nextroma] = pronunciationDataLarge[idx];
    setChar(nextchar);
    setRoma('...');
    window.setTimeout(() => {
      setRoma(nextroma);
    }, 3500);
  }

  return (
    <div>
      
      <Container maxWidth="sm">
      <Stack spacing={4} px={2} pb={4}>
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{p: 3}}>
          <Button variant="outlined" 
                onClick={colorMode.toggleColorMode}
                color="inherit"
                sx={{textTransform: "none"}}
                startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}>
            {getLocaleText(
              {"en": "Theme", "zh-tra": "主題", "zh-sim": "主题", "tto-bro": "Tvo2D8ae", "tto": "VvaH"}, 
              lang
              )}
          </Button>

          <FormControl >
            <InputLabel id="demo-simple-select-label">{getLocaleText(
              {"en": "Language", "zh-tra": "語言", "zh-sim": "语言", "tto-bro": "Zei2ZeiH", "tto": "SRHM"}, 
              lang
              )}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="Language"
              onChange={handleLangChange}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"zh-tra"}>繁體中文</MenuItem>
              <MenuItem value={"zh-sim"}>简体中文</MenuItem>
              <MenuItem value={"tto-bro"}>b8Q7Z2D.</MenuItem>
              <MenuItem value={"tto"}>mim</MenuItem>
            </Select>
          </FormControl>

        </Stack>

        <Typography>
            Display flashcards with Chinese characters and Jyutping with your comfortable speed.
        </Typography>

        <FlashCard char={char} roma={roma}></FlashCard>


        {/* Search Module */}
        {/* <TextField defaultValue="វិទ្យាស្ថានខុងជឺនៃរាជបណ្ឌិត្យសភាកម្ពុជា" id="input" onChange={(v) => setSentence(v.target.value)}
          multiline
          minRows={2} 
          maxRows={Infinity} />
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="outlined" onClick={() => handleClick()} sx={{width: "auto"}}>Lookup</Button>
        </Stack> */}


        {/* Speed Changing Module */}


      </Stack>
      </Container>
    </div>
  );
}

export default function AppWithColorToggler() {
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}