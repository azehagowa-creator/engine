import express from 'express';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Setup Ethereum & BSC providers
const ethProvider = new ethers.JsonRpcProvider(process.env.ETH_NODE);
const bscProvider = new ethers.JsonRpcProvider(process.env.BSC_NODE);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, ethProvider);

// Setup IPFS client
const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

// Health check
app.get('/health', (req, res) => res.send('Engine is running 🚀'));

// Example: Upload file to IPFS
app.post('/upload', async (req, res) => {
    try {
        const { content } = req.body;
        const result = await ipfs.add(content);
        res.json({ cid: result.path });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Example: Get ETH balance
app.get('/balance/:address', async (req, res) => {
    try {
        const balance = await ethProvider.getBalance(req.params.address);
        res.json({ balance: ethers.formatEther(balance) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Engine running at http://localhost:${port}`);
});
