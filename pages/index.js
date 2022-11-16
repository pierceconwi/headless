import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getSortedList } from '../lib/data';
import Link from 'next/link';
import Layout from '../components/layout.js';

export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: {
      allData
    }
  };
}

export default function Home({ allData }) {
  return (
    <Layout>
    <h1>CS55.13: Headless</h1>
    <p>version 1.0.5</p>
    <p>by Pierce Conwi</p>
    <div>
      {allData.map(({ id, name }) => (
        <Link key={id} href={`/pmc-pages/${id}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
        </Link>
      ))}
    </div>
    </Layout>
  )
}  