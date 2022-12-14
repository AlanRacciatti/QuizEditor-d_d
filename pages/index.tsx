import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { useState } from "react";
import Quiz from "../components/Quiz";
import { Button, Input, FormLabel } from "@chakra-ui/react";

export default function Home() {
  const [code, setCode] = useState(
    JSON.stringify(
      {
        title: "Quiz: Lesson 1",
        questions: [
          {
            question:
              "Apart from a user wallet, what else uses a blockchain (Ethereum) address?",
            options: [
              {
                answer: "Transactions",
              },
              {
                answer: "Smart contracts",
                correct: true,
              },
            ],
          },
          {
            question:
              "What is the use of the pragma solidity statement in our smart contract?",
            options: [
              {
                answer: "Defines that the file has Solidity code",
              },
              {
                answer: "Defines the Solidity version for the compiler",
                correct: true,
              },
            ],
          },
          {
            question: "What can we use a smart contract for?",
            options: [
              {
                answer: "Store or transfer value",
                correct: true,
              },
              {
                answer: "Make a breakfast",
              },
            ],
          },
        ],
      },
      null,
      2
    )
  );

  const copy = () => {
    navigator.clipboard.writeText(code);
  };

  const paste = async () => {
    try {
      JSON.parse(await navigator.clipboard.readText());
      setCode(await navigator.clipboard.readText());
    } catch (error) {
      alert("That's not JSON fren!");
    }
  };

  const quiz = () => JSON.parse(code);

  const changeTitle = (v) => {
    const quizCopy = quiz();
    quizCopy.title = v.target.value;
    setCode(JSON.stringify(quizCopy, null, 2));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz editor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Quiz editor</h1>
        <h3 className={styles.description}>
          Make your quizzes in JSON format without fighting with curly braces
          and commas :)
        </h3>

        <div className={styles.elements}>
          <div className={styles.quizzes}>
            <h2 className={styles.sectionTitle}>Preview</h2>
            <div className={styles.titleContainer}>
              <FormLabel textAlign="center">Title:</FormLabel>
              <Input
                className={styles.quizzesTitle}
                value={quiz().title}
                id="title"
                onChange={changeTitle}
                w="50%"
                textAlign="center"
              />
            </div>
            <Quiz quiz={code} setCode={setCode} />
          </div>
          <div className={styles.editor}>
            <h2 className={styles.sectionTitle}>JSON</h2>
            <Button
              colorScheme="yellow"
              backgroundColor="yellow.600"
              color="white"
              display="flex"
              margin="auto"
              float="right"
              size="sm"
              marginX="1"
              onClick={paste}
            >
              Paste code
            </Button>
            <Button
              colorScheme="yellow"
              backgroundColor="yellow.600"
              color="white"
              display="flex"
              margin="auto"
              size="sm"
              float="right"
              marginX="1"
              onClick={copy}
            >
              Copy code
            </Button>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.text)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                width: "100%",
              }}
              disabled
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/chiin_rock"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with
          <Image
            src="/love.svg"
            alt="Love"
            width={32}
            height={16}
            className={styles.logo}
          />
          by Chiin for D_D Academy
        </a>
      </footer>
    </div>
  );
}
