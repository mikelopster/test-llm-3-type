from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool
import vertexai
import sys

# Create a RAG Corpus, Import Files, and Generate a response
project_id = "project-id-name"
display_name = "test_corpus" # name
paths = ["example_file"]
search_term = sys.argv[1]

# Initialize Vertex AI API once per session
vertexai.init(project=project_id, location="us-central1")

# Create RagCorpus
rag_corpus = rag.create_corpus(display_name=display_name)

# Import Files to the RagCorpus
response = rag.import_files(
    rag_corpus.name,
    paths,
    chunk_size=512,  # Optional
    chunk_overlap=100,  # Optional
)

# Enhance generation
# Create a RAG retrieval tool
rag_retrieval_tool = Tool.from_retrieval(
    retrieval=rag.Retrieval(
        source=rag.VertexRagStore(
            rag_resources=[
                rag.RagResource(
                    rag_corpus=rag_corpus.name
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

# Modify the prompt template


def create_prompt(search_term):
    example_input_array = [
        {"id": 1, "name": "AAA", "price": 29.99, "image": "...", "link": "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
            "description": "A high-quality product designed for everyday use."},
        {"id": 2, "name": "BBB", "price": 45.5, "image": "...",
            "description": "Experience the premium quality of Product B."}
    ]

    example_output_array = [
        {"id": 1, "name": "AAA", "price": 29.99, "image": "...", "link": "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
            "description": "A high-quality product designed for everyday use."},
    ]

    return f"""You are a helpful assistant that can generate a JSON object based on a user's query. (Return only json in the format below)

**Query:**
{search_term}

Example Input JSON:
{example_input_array}

Valid JSON output:
{example_output_array}
"""


# Generate response
prompt = create_prompt(search_term)
response = rag_model.generate_content(prompt)
print(response.text)
