from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool
import vertexai

# Create a RAG Corpus, Import Files, and Generate a response
project_id = "apppi-gitlab"
display_name = "test_corpus"
paths = ["https://drive.google.com/file/d/1q-aPsMErQyfnm285VaXMzqtoj5LHD8MN/view?usp=sharing"]

# Initialize Vertex AI API once per session
print("== Setup Vertex")
vertexai.init(project=project_id, location="us-central1")

# Create RagCorpus
print("== Setup RAG")
rag_corpus = rag.create_corpus(display_name=display_name)
print(rag_corpus)

# Import Files to the RagCorpus
print("== Import File")
response = rag.import_files(
    rag_corpus.name,
    paths,
    chunk_size=512,  # Optional
    chunk_overlap=100,  # Optional
)

# Direct context retrieval
print("== Setup Vertex")
response = rag.retrieval_query(
    rag_resources=[
        rag.RagResource(
            rag_corpus=rag_corpus.name,
            # Supply IDs from `rag.list_files()`.
            # rag_file_ids=["rag-file-1", "rag-file-2", ...],
        )
    ],
    text="this is json file for product",
    similarity_top_k=10,  # Optional
    vector_distance_threshold=0.5,  # Optional
)
print("== Response")
print(response)

# Enhance generation
# Create a RAG retrieval tool
rag_retrieval_tool = Tool.from_retrieval(
    retrieval=rag.Retrieval(
        source=rag.VertexRagStore(
            rag_resources=[
                rag.RagResource(
                    rag_corpus=rag_corpus.name,  # Currently only 1 corpus is allowed.
                    # Supply IDs from `rag.list_files()`.
                    # rag_file_ids=["rag-file-1", "rag-file-2", ...],
                )
            ],
            similarity_top_k=3,  # Optional
            vector_distance_threshold=0.5,  # Optional
        ),
    )
)
# Create a gemini-pro model instance
rag_model = GenerativeModel(
    model_name="gemini-1.0-pro-002", tools=[rag_retrieval_tool]
)

# Generate response
response = rag_model.generate_content("search product id 2 and return result in json")
print("== End Result")
print(response.text)