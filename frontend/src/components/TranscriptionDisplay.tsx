interface Props {
  transcription: string;
}

const TranscriptionDisplay: React.FC<Props> = ({ transcription }) => {
  return (
    <div className="border-2 border-gray-300 p-4 mt-4">
      {/* Header for the transcription display */}
      <h2 className="text-xl mb-2">Transcription:</h2>

      {/* Display the transcription. 
           The whitespace-pre-wrap ensures that white spaces and line breaks are preserved. */}
      <pre className="whitespace-pre-wrap">{transcription}</pre>
    </div>
  );
};

export default TranscriptionDisplay;
