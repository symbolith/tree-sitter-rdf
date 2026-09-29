import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.ntriples.TreeSitterNtriples;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterNtriplesTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterNtriples.language()));
    }
}
